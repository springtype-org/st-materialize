import {attr, component, event} from "springtype/web/component";
import {st} from "springtype/core";
import {IEvent, IEventListener, ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {MatSelectItem, MatSelectItemClickDetail} from "./mat-select-item";
import {MatInput} from "..";
import {MatDropDown} from "./mat-select-drop-down";
import {FORM_IGNORE_PROPERTY_NAME, FORM_VALUE_FUNCTION_KEY} from "../form";
import {TYPE_FUNCTION} from "springtype/core/lang";

export type MatSelectType = 'multiple' | 'single' | 'single-deselect';

export interface MatSelectItemDetail {
    value: string;
    label: string;
    item: any;
}

export interface IAttrMatSelect {
    label: string;
    name: string;
    type?: MatSelectType;
    ignore?: boolean;
    readonly?: boolean;

    formIgnore?: boolean;
    validators?: Array<(value: string) => Promise<boolean>>;
    valueTransformer?: (selected: Array<MatSelectItem>, items?: Array<MatSelectItem>, select?: MatSelect) => any;

    onSelectItem?: IEventListener<MatSelectItemDetail>;
    onDeselectItem?: IEventListener<MatSelectItemDetail>;
}

export const SELECT_PROPERTY_NAME = "MAT_SELECT";

@component
export class MatSelect extends st.component<IAttrMatSelect> implements ILifecycle {

    @attr
    type: MatSelectType = 'single';

    @attr
    ignore: boolean = false;

    @attr
    label: string = '';

    @attr
    name: string = '';

    @attr
    readonly: boolean = false;

    @attr
    formIgnore: boolean = false;

    @attr
    validators: Array<(value: any) => Promise<boolean>> = [];

    @attr
    valueTransformer!: (selected: Array<MatSelectItem>, items: Array<MatSelectItem>, select: MatSelect) => any;

    @ref
    matInputRef!: MatInput;

    @ref
    inputHiddenRef!: HTMLInputElement;

    @ref
    matDropdownRef!: MatDropDown;

    @ref
    inputFieldRef!: HTMLElement;

    @event
    onSelectItem!: IEventListener<MatSelectItemDetail>;

    @event
    onDeselectItem!: IEventListener<MatSelectItemDetail>;

    dispatchSelectItem = (detail: MatSelectItemDetail) => {
        this.dispatchEvent<MatSelectItemDetail>("selectItem", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };
    dispatchDeselectItem = (detail: MatSelectItemDetail) => {
        this.dispatchEvent<MatSelectItemDetail>("deselectItem", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };

    open = false;
    items: Array<MatSelectItem> = [];
    selectedItems: Array<MatSelectItem> = [];
    class = [];

    render() {
        return <div ref={{inputFieldRef: this}} class={['input-field']}>
            <div class={['select-wrapper', this.readonly ? 'readonly' : '', this.disabled ? 'disabled' : '']}
                 onClick={() => this.toggleSelect()}>
                <MatInput ref={{matInputRef: this}} name={this.name} placeholder={this.label}
                          formIgnore={true}
                          disabled={this.disabled}
                          class="select-dropdown" type="text" readonly={true}
                          validators={this.validators}
                />
                <input ref={{inputHiddenRef: this}} name={this.name} disabled hidden={true}/>
                <MatDropDown ref={{matDropdownRef: this}} onSelectItemClick={(evt) => this.onItemSelect(evt)}>
                    {this.renderChildren()}
                </MatDropDown>
                <svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div>
    }


    onBeforeRender(): void {
        this.selectedItems = [];
    }

    onAfterRender(): void {
        this.items = [];
        this.selectedItems = [];

        if (this.formIgnore) {
            (this.inputHiddenRef as any)[FORM_IGNORE_PROPERTY_NAME] = true;
        }

        (this.inputHiddenRef as any)[FORM_VALUE_FUNCTION_KEY] = () => {
            if (this.valueTransformer && typeof this.valueTransformer === TYPE_FUNCTION) {
                return this.valueTransformer(this.selectedItems, this.items, this);
            } else {
                return this.getValues()
            }
        };

        const children = this.matDropdownRef.childComponents;
        for (const child of children) {
            if (child instanceof MatSelectItem) {
                const matSelectItem = child as MatSelectItem;
                (matSelectItem.el as any)[SELECT_PROPERTY_NAME] = this;
                this.items.push(child);
                if (matSelectItem.selected) {
                    this.selectedItems.push(matSelectItem);
                }
            }
        }
        this.updateSelectValue();
    }

    toggleSelect() {
        if (!this.disabled && !this.readonly) {

            this.open = !this.open;
            if (!this.disabled) {
                this.onResize();
                this.matDropdownRef.show(this.open);
            }
        }
    }

    onConnect(): void {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    onDisconnect(): void {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseUp = (evt: MouseEvent) => {
        if (this.open && (evt.target as any).closest('.select-wrapper') !== this.matDropdownRef.el) {
            this.toggleSelect();
        }
    };

    onResize = () => {
        const bounding = this.inputFieldRef.getBoundingClientRect();
        this.matDropdownRef.el.setAttribute('style', `width: ${bounding.width}px`)
    };

    onItemSelect = (evt: IEvent<MatSelectItemClickDetail>) => {
        this.toggleSelect();
        const eventDetail = evt.detail as MatSelectItemClickDetail;

        if (this.type == "multiple") {
            if (eventDetail.selected) {
                this.dispatchSelectItem({
                    item: eventDetail.item.item,
                    value: eventDetail.item.value,
                    label: eventDetail.item.label
                })
            } else {
                this.dispatchDeselectItem({
                    item: eventDetail.item.item,
                    value: eventDetail.item.value,
                    label: eventDetail.item.label
                })
            }
        }
        if (this.type === 'single-deselect') {
            if (eventDetail.selected) {
                this.dispatchSelectItem({
                    item: eventDetail.item.item,
                    value: eventDetail.item.value,
                    label: eventDetail.item.label
                })
            } else {
                this.dispatchDeselectItem({
                    item: eventDetail.item.item,
                    value: eventDetail.item.value,
                    label: eventDetail.item.label
                })
            }
            if (this.selectedItems.length > 0 && eventDetail.item.value !== this.selectedItems[0].value) {
                this.dispatchDeselectItem({
                    item: this.selectedItems[0].item,
                    value: this.selectedItems[0].value,
                    label: this.selectedItems[0].label
                })
            }
        }

        if (this.type === "single" && eventDetail.selected) {
            this.dispatchSelectItem({
                item: eventDetail.item.item,
                value: eventDetail.item.value,
                label: eventDetail.item.label
            })
        }

        this.setMatSelectedItem(eventDetail);

        this.updateSelectValue();
    };

    setMatSelectedItem(detail: MatSelectItemClickDetail) {
        if (this.type === 'multiple') {
            if (detail.selected) {
                this.selectedItems.push(detail.item);
            } else {
                for (let i = 0; i < this.selectedItems.length; i++) {
                    const item = this.selectedItems[i];
                    if (item === detail.item) {
                        this.selectedItems.splice(i, 1);
                        break;
                    }
                }
            }
        } else if (this.type === 'single-deselect') {
            if (detail.selected) {
                for (const selected of this.selectedItems) {
                    selected.setSelected(false);
                }
                this.selectedItems = [detail.item];
            } else {
                this.selectedItems = [];
            }
        } else if (this.type === 'single') {
            for (const selected of this.selectedItems) {
                selected.setSelected(false);
            }
            detail.item.setSelected(true);
            this.selectedItems = [detail.item];
        }
    }

    updateSelectValue() {
        this.matInputRef.inputRef.value = this.selectedItems.map(item => item.label).join(' ');
        (this.inputHiddenRef.value) = this.selectedItems.map(item => item.value).join(' ');
    }

    getValues(): Array<string> {
        return this.selectedItems.map(v => v.value);
    }

    getSelectedItems(): Array<MatSelectItem> {
        return this.selectedItems;
    }
}