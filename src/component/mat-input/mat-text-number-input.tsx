import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {getUniqueHTMLId} from "../../function/get-unique-html-id";
import {Validation} from "../form/validation";
import {IVirtualNode} from "springtype/web/vdom/interface";

export interface IAttrMatTextInput {
    label?: string | IVirtualNode;
    value?: string;
    helperText?: string | IVirtualNode;
    type?: 'text' | 'number' | 'password' | string;
    readonly?: boolean;
    disabled?: boolean;
    validationSuccessMessage?: string;
    validationErrorMessages?: { [error: string]: string | IVirtualNode };
}

@component
export class MatTextNumberInput extends st.staticComponent<IAttrMatTextInput> implements ILifecycle {

    @attr
    label: string | IVirtualNode = '';

    @attr
    helperText: string | IVirtualNode = '';

    @attr
    validationErrorMessages: { [error: string]: string | IVirtualNode } = {};

    @attr
    validationSuccessMessage: string = '';

    /**
     * Input specific stuff
     */

    @attr
    value: string = '';

    @attr
    type: 'text' | 'number' | 'password' = 'text';

    @attr
    readonly: boolean = false;

    @attr
    disabled: boolean = false;

    @attr
    maxLength: number;

    @ref
    inputRef: HTMLInputElement;

    @ref
    labelRef: HTMLLabelElement;

    tag = 'div';

    class = ['input-field'];

    inputId: string;

    constructor() {
        super();
        this.inputId = getUniqueHTMLId();
    }

    render() {
        return <fragment>
            <Validation>
                <input id={this.inputId} ref={{inputRef: this}}
                       type={this.type} value={this.value}
                       disabled={this.disabled} readonly={this.readonly}
                       maxLength={this.maxLength}
                       onFocus={() => this.onInputFocus()}
                       onBlur={() => this.onInputBlur()}/>
            </Validation>
            <label ref={{labelRef: this}} class={[this.value ? 'active' : '']} for={this.inputId}>{this.label}</label>
            <span ref={{helperSpanRef: this}} class="helper-text" data-success={this.validationSuccessMessage}>{this.helperText}</span>
        </fragment>
    }

    onInputFocus = () => {
        this.labelRef.classList.add('active');
    };

    onInputBlur = () => {
        if (!this.getValue()) {
            this.labelRef.classList.remove('active');
        }
    };

    getValue() {
        if (this.type == 'number') {
            return this.inputRef.valueAsNumber;
        }
        return this.inputRef.value;
    }
}
