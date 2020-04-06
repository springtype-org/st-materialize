import {attr, component, event} from "springtype/web/component";
import {st} from "springtype/core";
import {IEventListener} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {Validation, VALIDATION_PROPERTY_NAME} from "./validation";
import {htmlCollectionToArray} from "springtype/core/lang";

export interface FromValidationDetail<TYPE> {
    valid: boolean,
    state: TYPE
}

export interface IAttrForm {
    name?: string;
}

export const FORM_PROPERTY_NAME = "MAT_FROM";
export const FORM_IGNORE_PROPERTY_NAME = "MAT_FORM_IGNORE";

@component
export class Form extends st.component<IAttrForm> {

    @attr
    name: string = "form";

    @ref
    formRef!: HTMLFormElement;

    @event
    onFormValidation!: IEventListener<Event>;

    dispatchFormValidation = (detail: FromValidationDetail<any>) => {
        this.dispatchEvent<FromValidationDetail<any>>("formValidation", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };


    render() {
        return <fragment>
            <form ref={{formRef: this}}>
                {this.renderChildren()}
            </form>
        </fragment>
    }

    onAfterRender(): void {
        this.addForm()
        this.overrideSubmit();
    }

    addForm() {
        (this.formRef as any)[FORM_PROPERTY_NAME] = this;
    }

    overrideSubmit() {
        //ignore on submit validate forms async
        this.formRef.onsubmit = () => false;
        this.el.addEventListener('submit', async () => {
            if (await this.validate()) {
                this.formRef.submit();
            }
        })
    }

    async validate<STATE_TYPE>(force: boolean = false): Promise<boolean> {
        return new Promise(async (resolve) => {
            let result = true;
            const elementResults: Array<Promise<boolean>> = [];
            for (const element of this.getElements()) {
                elementResults.push(element.validate(force));
            }
            const formResults: Array<Promise<boolean>> = [];

            for (const subForm of this.getSubForm()) {
                formResults.push(subForm.validate(force))
            }
            if ((await Promise.all(elementResults)).filter(v => !v).length > 0) {
                (this.el as HTMLFormElement).checkValidity();
                result = false;
            }
            if ((await Promise.all(formResults)).filter(v => !v).length > 0) {
                result = false;
            }
            const validateResult: FromValidationDetail<STATE_TYPE> = {
                valid: result,
                state: this.getState() as STATE_TYPE
            };
            this.dispatchFormValidation(validateResult);
            resolve(result);
        });
    }

    getElements(): Array<Validation> {
        const validationComponents: Array<Validation> = [];
        for (const element of htmlCollectionToArray<any>((this.formRef.elements))) {
            if (element[VALIDATION_PROPERTY_NAME] && element[VALIDATION_PROPERTY_NAME] instanceof Validation) {
                const validationComponent = element[VALIDATION_PROPERTY_NAME] as Validation;
                if (!element.disabled && !element.readonly) {
                    validationComponents.push(validationComponent);
                }
            }
        }
        return validationComponents;
    }

    getState<TYPE>(): TYPE {
        const formState: { [key: string]: any } = {};
        const radios: { [name: string]: RadioNodeList } = {};
        const elements = this.formRef.elements;
        for (const element of htmlCollectionToArray<HTMLElement>(elements)) {
            if (
                element instanceof HTMLButtonElement
                || (element as any)[FORM_IGNORE_PROPERTY_NAME]) {
                continue
            }

            if (element instanceof HTMLInputElement) {
                const htmlInput = element as HTMLInputElement;
                if (htmlInput.type === 'radio' && htmlInput.name) {
                    radios[htmlInput.name] = elements.namedItem(htmlInput.name) as RadioNodeList;
                    continue;
                }
                if (htmlInput.type === 'checkbox' && htmlInput.name) {
                    formState[htmlInput.name] = htmlInput.checked;
                    continue;
                }
            }
            const htmlElement = (element as any);
            const elementName = htmlElement.name;
            formState[elementName] = htmlElement.value;
        }
        for (const radioGroupName of Object.keys(radios)) {
            formState[radioGroupName] = radios[radioGroupName].value;
        }
        for (const form of this.getSubForm()) {
            formState[form.name] = form.getState();
        }
        return formState as TYPE;
    }

    getSubForm(): Array<Form> {
        const forms: Array<Form> = [];
        for (const form of htmlCollectionToArray<any>(this.el.querySelectorAll('form'))) {
            if (form[FORM_PROPERTY_NAME] && form[FORM_PROPERTY_NAME] instanceof Form) {
                const nestedForm = form[FORM_PROPERTY_NAME] as Form;
                if (nestedForm.parent === this) {
                    forms.push(nestedForm);
                }
            } else {
                st.error('Using an nested form, please use <Form name="formName">', form);
            }
        }
        return forms;
    }

    reset() {
        this.formRef.reset();
    }
}