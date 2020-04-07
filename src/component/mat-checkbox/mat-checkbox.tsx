import {st} from "springtype/core";
import {IEvent, IEventListener, ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {required} from "springtype/core/validate";
import {Validation, ValidationEventDetail} from "../form/validation";
import {FORM_IGNORE_PROPERTY_NAME} from "../form/form";
import {matGetConfig} from "../../config";

export interface IMatCheckboxAttrs {
    name: string;
    label: string;
    required?: boolean;
    checked?: boolean;
    formIgnore?: boolean;
    setValidClass?: boolean;

    filled?: boolean;

    debounceTimeInMs?: number;
    eventListeners?: Array<string>;
    onValidation?: IEventListener<ValidationEventDetail>;
}

@component({tag: 'label'})
export class MatCheckbox extends st.component<IMatCheckboxAttrs> implements ILifecycle {


    @attr
    name: string = '';

    @attr
    label: string = '';

    @attr
    required: boolean = false;

    @attr
    checked: boolean = false;

    @attr
    formIgnore: boolean = false;

    @attr
    setValidClass: boolean = matGetConfig().setValidClass;

    /**
     * only styling
     */
    @attr
    filled: boolean = false;

    @attr
    eventListeners!: Array<string>;

    @attr
    debounceTimeInMs!: number;


    @ref
    inputRef!: HTMLInputElement;
    @ref

    @ref
    validationRef!: Validation;


    render() {
        const validators = [];
        if (this.required) {
            validators.push(required);
        }
        return <Validation ref={{validationRef: this}} validators={validators}
                           onValidation={(evt) => this.onAfterValidate(evt)}
                           debounceTimeInMs={this.debounceTimeInMs} eventListeners={this.eventListeners}>
            <input ref={{inputRef: this}} name={this.name} type="checkbox"
                   disabled={this.disabled} checked={this.checked}
                   class={[this.filled ? 'filled-in' : '']}/>
            <span>{this.label}</span>
        </Validation>
    }

    onAfterRender(): void {
        super.onAfterRender();
        if (this.formIgnore) {
            (this.inputRef as any)[FORM_IGNORE_PROPERTY_NAME] = true;
        }
    }

    onAfterValidate(evt: IEvent<ValidationEventDetail>) {
        if (!this.disabled) {
            const detail = evt.detail as ValidationEventDetail;
            this.inputRef.classList.remove('valid', 'invalid');
            if (!detail.valid) {
                this.inputRef.classList.add('invalid');
            } else if (this.setValidClass) {
                this.inputRef.classList.add('valid');
            }
        }
    }

    getChecked() {
        return this.inputRef.checked;
    }

    async validate(force: boolean) {
        return await this.validationRef.validate(force);
    }
}