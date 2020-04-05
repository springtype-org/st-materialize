import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {getUniqueHTMLId} from "../../function/get-unique-html-id";
import {Validation} from "../form/validation";
import {IVirtualNode} from "springtype/web/vdom/interface";
import {TYPE_UNDEFINED} from "springtype/core/lang";
import {IValidator} from "springtype/core/validate/interface/ivalidator";
import {maxLength, minLength, pattern, required} from "springtype/core/validate";
import {min} from "../validate/min";
import {max} from "../validate/max";

export interface IAttrMatTextInput {
    label?: string | IVirtualNode;
    helperText?: string | IVirtualNode;
    characterCounter?: boolean;
    validators?: Array<(value: string | number | Date) => Promise<boolean>>;
    validationErrorMessages?: { [error: string]: string | IVirtualNode };
    validationSuccessMessage?: string;
    formIgnore?: boolean;

    name: string;
    value?: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'date';
    placeholder?: string;
    readonly?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    required?: boolean;
    max?: number | Date;
    min?: number | Date;
    step?: number;
    hidden?: boolean;
}

@component
export class MatInput extends st.component<IAttrMatTextInput> implements ILifecycle {

    @attr
    label: string | IVirtualNode = '';

    @attr
    helperText: string | IVirtualNode = '';

    @attr
    characterCounter: boolean = false;

    @attr
    validators: Array<(value: string | number | Date) => Promise<boolean>> = [];

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
     * Input specific stuff
     */
    @attr
    name!: string;

    @attr
    value!: string;

    @attr
    type: 'text' | 'email' | 'number' | 'password' | 'date' = 'text';

    @attr
    placeholder!: string;

    @attr
    readonly!: boolean;

    @attr
    maxLength!: number;

    @attr
    minLength!: number;

    @attr
    pattern!: RegExp;

    @attr
    required!: boolean;
    //for range
    @attr
    max!: number | Date;

    @attr
    min!: number | Date;

    @attr
    step!: number;

    //hide the complete object
    @attr
    hidden!: boolean;

    @ref
    inputRef!: HTMLInputElement;

    @ref
    labelRef!: HTMLLabelElement;

    @ref
    helperTextRef!: HTMLSpanElement;

    @ref
    counterRef!: HTMLSpanElement;

    inputId: string;


    constructor() {
        super();
        this.inputId = getUniqueHTMLId();
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
        if (typeof this.pattern !== TYPE_UNDEFINED) {
            internalValidators.push(pattern(this.pattern))
        }
        if (typeof this.max !== TYPE_UNDEFINED) {
            internalValidators.push(min(this.min))
        }
        if (typeof this.min !== TYPE_UNDEFINED) {
            internalValidators.push(max(this.max))
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
                           class={[this.value || this.placeholder || this.type === 'date' ? 'active' : '']}
                           for={this.inputId}>{this.label}</label>
        }
        return <Validation validators={internalValidators}>
            <div class={['input-field']} style={{display: this.hidden ? 'none' : ''}}>
                {this.renderChildren()}
                <input ref={{inputRef: this}} attrs={{
                    id: this.inputId,
                    name: this.name,
                    type: this.type,
                    value: this.value,
                    step: this.step,
                    placeholder: this.placeholder,
                    disabled: this.disabled,
                    readOnly: this.readonly,
                    //validation
                    required: this.required,
                    minLength: this.minLength,
                    maxLength: this.maxLength,
                    min: this.prepareRange(this.min),
                    max: this.prepareRange(this.max),
                    pattern: this.pattern ? this.pattern.toString() : undefined,
                }}
                       onInput={() => this.onCharacterCounterUpdate()}
                       onFocus={() => this.onInputFocus()}
                       onBlur={() => this.onInputBlur()}/>
                {label}{spanHelperTextAndCounter}

            </div>
        </Validation>
    }

    onAfterRender(): void {
        super.onAfterRender();
        if (this.formIgnore) {
            this.inputRef.setAttribute('form-ignore', '');
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
    onCharacterCounterUpdate = () => {
        if (this.counterRef) {
            this.counterRef.innerText = this.getCharacterCountText(this.inputRef.value);
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
        if (this.labelRef && !this.inputRef.value && this.type !== 'date' && !this.placeholder) {
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

    formatDate(date: Date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    prepareRange(range: number | Date): string | undefined {
        if (typeof range !== TYPE_UNDEFINED) {
            if (range instanceof Date) {
                return this.formatDate(range);
            } else {
                return range.toString();
            }
        }
    }
}