import {st} from "springtype/core";
import {IEvent, ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {getUniqueHTMLId} from "../../function/get-unique-html-id";
import {FORM_IGNORE_PROPERTY_NAME, IAttrValidation, Validation, ValidationEventDetail} from "../form";
import {mergeArrays, TYPE_UNDEFINED} from "springtype/core/lang";
import {maxLength, minLength, pattern, required} from "springtype/core/validate";
import {min} from "../validate/min";
import {max} from "../validate/max";
import {matGetConfig} from "../../config";

export interface IAttrMatTextInput extends IAttrValidation {
    label?: string;
    helperText?: string;
    characterCounter?: boolean;
    validators?: Array<(value: string | number | Date) => Promise<boolean>>;

    validationErrorMessages?: { [error: string]: string };
    validationSuccessMessage?: string;
    formIgnore?: boolean;
    setValidClass?: boolean;

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
    label: string = '';

    @attr
    helperText: string = '';

    @attr
    characterCounter: boolean = false;

    @attr
    validationErrorMessages: { [error: string]: string } = {};

    @attr
    validationSuccessMessage: string = '';

    /**
     * this field will be ignored by from state
     */
    @attr
    formIgnore: boolean = false;

    @attr
    setValidClass: boolean = matGetConfig().setValidClass;

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

    //validation properties
    @attr
    eventListeners!: Array<string>;

    @attr
    debounceTimeInMs!: number;

    @attr
    validators: Array<(value: any) => Promise<boolean>> = [];

    @ref
    inputRef!: HTMLInputElement;

    @ref
    labelRef!: HTMLLabelElement;

    @ref
    helperTextRef!: HTMLSpanElement;

    @ref
    counterRef!: HTMLSpanElement;

    @ref
    validationRef!: Validation;

    inputId: string;

    constructor() {
        super();
        this.inputId = getUniqueHTMLId();
    }

    render() {
        const internalValidators = [];

        if (typeof this.required !== TYPE_UNDEFINED) {
            internalValidators.push(required)
        }
        if (typeof this.maxLength !== TYPE_UNDEFINED) {
            internalValidators.push(maxLength(this.maxLength))
        }
        if (typeof this.minLength !== TYPE_UNDEFINED) {
            internalValidators.push(minLength(this.minLength))
        }
        if (typeof this.max !== TYPE_UNDEFINED) {
            internalValidators.push(min(this.min))
        }
        if (typeof this.min !== TYPE_UNDEFINED) {
            internalValidators.push(max(this.max))
        }
        if (typeof this.pattern !== TYPE_UNDEFINED) {
            internalValidators.push(pattern(this.pattern))
        }

        let label;
        if (this.label) {
            label = <label ref={{labelRef: this}}
                           class={[this.value || this.placeholder || this.type === 'date' ? 'active' : '']}
                           for={this.inputId}>{this.label}</label>
        }
        return <Validation ref={{validationRef: this}} validators={mergeArrays(internalValidators, this.validators)}
                           eventListeners={this.eventListeners} debounceTimeInMs={this.debounceTimeInMs}
                           onValidation={(evt) => this.onAfterValidate(evt)}>
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
                       onBlur={() => this.onInputBlur()}
                />
                {label}
                <div ref={{helperTextRef: this}} class="helper-text mat-input-helper-counter"
                     data-success={this.validationSuccessMessage}>
                    <span style={{flex: 1}}>{this.helperText}</span>
                    <span ref={{counterRef: this}}
                          class={["character-counter", this.value && this.characterCounter ? '' : 'hide']}>
                        {this.getCharacterCountText(this.value)}
                    </span>
                </div>
            </div>
        </Validation>
    }

    onAfterRender(): void {
        super.onAfterRender();
        if (this.formIgnore) {
            (this.inputRef as any)[FORM_IGNORE_PROPERTY_NAME] = true;
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

    onAfterValidate = (evt: IEvent<ValidationEventDetail>) => {
        if (!this.readonly && !this.disabled) {
            const details = evt.detail as ValidationEventDetail;
            this.helperTextRef.removeAttribute("data-error");
            this.inputRef.classList.remove('valid', 'invalid');
            if (!details.valid) {
                this.inputRef.classList.add('invalid');
                const error = this.getError(details.errors);
                if (error) {
                    this.helperTextRef.setAttribute("data-error", error);
                }
            } else if (this.setValidClass) {
                this.inputRef.classList.add('valid');
            }
        }
    };

    getError(errors: Array<string>) {
        for (const error of errors) {
            const message = this.validationErrorMessages[error];
            if (message) {
                return message;
            }
        }
    }

    getValue() {
        return this.inputRef.value;
    }

    getChecked() {
        return this.inputRef.checked;
    }

    getValueAsNumber() {
        return this.inputRef.valueAsNumber;
    }

    getValueAsDate() {
        return this.inputRef.valueAsDate;
    }

    async validate(force: boolean) {
        return await this.validationRef.validate(force);
    }
}