import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {getUniqueHTMLId} from "../../function/get-unique-html-id";
import {Validation} from "../form/validation";
import {IVirtualNode} from "springtype/web/vdom/interface";
import {TYPE_UNDEFINED} from "springtype/core/lang";
import {maxLength, minLength, required} from "springtype/core/validate";

export interface IAttrMatTextArea {
    label: string | IVirtualNode;
    helperText: string | IVirtualNode;
    characterCounter: boolean;
    validators: Array<(value: string) => Promise<boolean>>;
    validationErrorMessages: { [error: string]: string | IVirtualNode };
    validationSuccessMessage: string;
    formIgnore?: boolean;

    name: string;
    value?: string;
    spellcheck?: boolean;
    wrap?: 'hard' | 'soft' | 'off';
    rows?: number;
    autocomplete?: 'on' | 'off';
    placeholder?: string;
    readonly?: boolean;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    hidden?: boolean;
}

@component
export class MatTextArea extends st.component<IAttrMatTextArea> implements ILifecycle {

    @attr
    label: string | IVirtualNode = '';

    @attr
    helperText: string | IVirtualNode = '';

    @attr
    characterCounter: boolean = false;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    @attr
    validationErrorMessages: { [error: string]: string | IVirtualNode } = {};

    @attr
    validationSuccessMessage: string = '';
    /**
     * this field will be ignored by from state
     */
    @attr
    formIgnore: boolean = false;

    /**
     * text-area specific stuff
     */
    @attr
    name!: string;

    @attr
    value!: string;

    @attr
    spellcheck!: boolean;

    @attr
    wrap!: 'hard' | 'soft' | 'off';

    @attr
    rows!: number;

    @attr
    autocomplete!: 'on' | 'off';

    @attr
    placeholder!: string;

    @attr
    readonly!: boolean;

    @attr
    maxLength!: number;

    @attr
    minLength!: number;

    @attr
    required!: boolean;

    //hide the complete object
    @attr
    hidden!: boolean;

    @ref
    textAreaRef!: HTMLTextAreaElement;

    @ref
    labelRef!: HTMLLabelElement;

    @ref
    helperTextRef!: HTMLSpanElement;

    @ref
    counterRef!: HTMLSpanElement;

    textAreaId: string;


    constructor() {
        super();
        this.textAreaId = getUniqueHTMLId();
    }

    render() {
        const internalValidators = this.validators;

        if (typeof this.required !== TYPE_UNDEFINED) {
            internalValidators.push(required)
        }
        if (typeof this.maxLength !== TYPE_UNDEFINED) {
            internalValidators.push(maxLength(this.maxLength))
        }
        if (typeof this.minLength !== TYPE_UNDEFINED) {
            internalValidators.push(minLength(this.minLength))
        }


        let spanHelperTextAndCounter, label;
        if (this.helperText || this.validationSuccessMessage || this.characterCounter) {
            spanHelperTextAndCounter = <div class="mat-input-helper-counter">
                <span ref={{helperSpanRef: this}} class="helper-text"
                      data-success={this.validationSuccessMessage} style="flex: 1">{this.helperText}
            </span>
                <span ref={{counterRef: this}}
                      class={["character-counter", this.value && this.characterCounter ? '' : 'hide']}>{this.getCharacterCountText(this.value)}</span>
            </div>
        }
        if (this.label) {
            label = <label ref={{labelRef: this}}
                           class={[this.value || this.placeholder ? 'active' : '']}
                           for={this.textAreaId}>{this.label}</label>
        }
        return <Validation validators={internalValidators}>
            <div class={['input-field']} style={{display: this.hidden ? 'none' : ''}}>
                {this.renderChildren()}
                <textarea ref={{textAreaRef: this}} class={['materialize-textarea']}
                          style={{height: `${this.getHeight(this.value)}px`}}
                          attrs={{
                              id: this.textAreaId,
                              name: this.name,
                              placeholder: this.placeholder,
                              disabled: this.disabled,
                              readOnly: this.readonly,
                              spellcheck: this.spellcheck,
                              wrap: this.wrap,
                              rows: this.rows,
                              autocomplete: this.autocomplete,
                              //validation
                              required: this.required,
                              minLength: this.minLength,
                              maxLength: this.maxLength,
                          }}
                          onInput={() => {
                              this.onHeightChange();
                              this.onCharacterCounterUpdate();
                          }}
                          onFocus={() => this.onInputFocus()}
                          onBlur={() => this.onInputBlur()}>
                    {this.value}
                </textarea>
                {label}{spanHelperTextAndCounter}

            </div>
        </Validation>
    }

    onAfterRender(): void {
        super.onAfterRender();
        if (this.formIgnore) {
            this.textAreaRef.setAttribute('form-ignore', '');
        }
    }

    onInputFocus = () => {
        if (this.labelRef) {
            this.labelRef.classList.add('active');
        }
        const matIcon = this.el.querySelector('.mat-icon');
        if (matIcon) {
            matIcon.classList.add('active')
        }
        const materialIcon = this.el.querySelector('.material-icons');
        if (materialIcon) {
            materialIcon.classList.add('active')
        }
        if (this.counterRef) {
            this.counterRef.classList.remove('hide');
        }
    };

    onHeightChange() {
        const value = this.textAreaRef.value;
        this.textAreaRef.setAttribute('style', `height: ${this.getHeight(value)}px`);
    }

    getHeight(value: string) {
        const lineHeight = this.getValueHeight(value);
        const defaultLineHeight = this.getDefaultHeight();
        return lineHeight > defaultLineHeight ? lineHeight : defaultLineHeight;
    }

    getValueHeight(value: string) {
        if (value) {
            const lines = value.split(/\r*\n/).length;
            return ((lines - 1) * 21) + 45;
        }

        return 54
    }

    getDefaultHeight() {
        if (this.rows) {
            return ((this.rows - 1) * 21) + 45;
        }
        return 45;
    }

    onCharacterCounterUpdate = () => {
        if (this.counterRef) {
            this.counterRef.innerText = this.getCharacterCountText(this.textAreaRef.value);
        }
    };

    getCharacterCountText(value: string) {
        if (this.characterCounter) {
            let counterText = (value || '').length.toString();
            if (this.maxLength) {
                counterText = counterText + '/' + this.maxLength;
            }
            return counterText;
        }
        return '';
    }

    onInputBlur = () => {
        if (this.labelRef && !this.textAreaRef.value && !this.placeholder) {
            this.labelRef.classList.remove('active');
        }
        const matIcon = this.el.querySelector('.mat-icon');
        if (matIcon) {
            matIcon.classList.remove('active')
        }
        const materialIcon = this.el.querySelector('.material-icons');
        if (materialIcon) {
            materialIcon.classList.remove('active')
        }
    };
}
