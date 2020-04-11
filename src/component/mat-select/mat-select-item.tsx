import {attr, component, event} from "springtype/web/component";
import {st} from "springtype/core";
import {IEventListener, ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";

export interface MatSelectItemClickDetail {
    selected: boolean;
    item: MatSelectItem;
}

export interface IAttrMatSelectItem {
    label: string;
    value: string;
    selected?: boolean;
    item?: any;
    onMatSelectItemClick?: IEventListener<MatSelectItemClickDetail>
}

@component
export class MatSelectItem extends st.component<IAttrMatSelectItem> implements ILifecycle {

    @ref
    itemLiRef!: HTMLLIElement;

    @attr
    label: string = '';

    @attr
    value: string = '';

    @attr
    item!: any;

    @attr
    selected: boolean = false;

    @event
    onMatSelectItemClick!: IEventListener<MatSelectItemClickDetail>;

    dispatchMatSelectItemClick = (detail: MatSelectItemClickDetail) => {
        this.dispatchEvent<MatSelectItemClickDetail>("matSelectItemClick", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };


    render() {
        return <li ref={{itemLiRef: this}} tabindex="0" class={this.getItemClasses()}
                   onClick={() => this.onSelectClick()}>
            <span>{this.label}</span></li>
    }



    getItemClasses() {
        const classes = [];
        if (this.disabled) {
            classes.push('disabled');
        }
        if (this.selected) {
            classes.push('selected');
        }
        return classes;
    }

    onSelectClick() {
        if (!this.disabled) {
            this.setSelected(!this.selected);
            this.dispatchMatSelectItemClick({
                selected: this.selected,
                item: this
            })
        }
    }

    setSelected(selected: boolean){
        this.selected =  selected;
        this.itemLiRef.setAttribute('class',
            this.getItemClasses().join(' ')
        );
    }
}