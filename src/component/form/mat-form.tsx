import {attr, component, event} from "springtype/web/component";
import {st} from "springtype/core";
import {IEventListener} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {MatValidation, VALIDATION_PROPERTY_NAME} from "./mat-validation";
import {htmlCollectionToArray, TYPE_FUNCTION} from "springtype/core/lang";

export interface FromValidationDetail {
    valid: boolean,
    state: any
}

export interface IAttrForm {
    name?: string;
}

export const FORM_PROPERTY_NAME = "MAT_FROM";
export const FORM_IGNORE_PROPERTY_NAME = "MAT_FORM_IGNORE";
export const FORM_VALUE_FUNCTION_KEY = "MAT_FORM_VALUE_FUNCTION";

@component
export class MatForm extends st.component<IAttrForm> {

    @attr
    name: string = "form";

    @ref
    formRef!: HTMLFormElement;

    @event
    onFormValidation!: IEventListener<Event>;

    dispatchFormValidation = (detail: FromValidationDetail) => {
        this.dispatchEvent<FromValidationDetail>("formValidation", {
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
        this.addMatFormToForm();
        this.overrideSubmit();
    }

    addMatFormToForm() {
        (this.formRef as any)[FORM_PROPERTY_NAME] = this;
    }

    overrideSubmit() {
        //ignore on submit validate forms async
        this.formRef.addEventListener('submit', (evt) => {
            evt.preventDefault();

        })
    }

    async validate(force: boolean = false): Promise<boolean> {
        return new Promise(async (resolve) => {
            let result = true;
            const elementPromises = await Promise.all(this.getElements().map(element => element.validate(force)));
            if (elementPromises.filter(v => !v).length > 0) {
                this.formRef.checkValidity();
                result = false;
            }
            const subFormPromises = await Promise.all(this.getSubForm().map(element => element.validate(force)));
            if (subFormPromises.filter(v => !v).length > 0) {
                result = false;
            }
            const validateResult: FromValidationDetail = {
                valid: result,
                state: this.getState()
            };
            this.dispatchFormValidation(validateResult);
            resolve(result);
        });
    }

    getElements(): Array<MatValidation> {
        const validationComponents: Array<MatValidation> = [];
        for (const element of htmlCollectionToArray<any>((this.formRef.elements))) {
            if (element[VALIDATION_PROPERTY_NAME] && element[VALIDATION_PROPERTY_NAME] instanceof MatValidation) {
                const validationComponent = element[VALIDATION_PROPERTY_NAME] as MatValidation;
                if (!element.disabled && !element.readonly) {
                    validationComponents.push(validationComponent);
                }
            }
        }
        return validationComponents;
    }

    getState(): any {
        const formState: { [key: string]: any } = {};
        const radios: { [name: string]: RadioNodeList } = {};
        const elements = this.formRef.elements;
        for (const element of htmlCollectionToArray<HTMLElement>(elements)) {
            const anyElement = element as any;
            if (
                element instanceof HTMLButtonElement
                || anyElement[FORM_IGNORE_PROPERTY_NAME]) {
                continue
            }
            if (anyElement[FORM_VALUE_FUNCTION_KEY] && typeof anyElement[FORM_VALUE_FUNCTION_KEY] === TYPE_FUNCTION) {
                formState[anyElement.name] = anyElement[FORM_VALUE_FUNCTION_KEY]();
                continue;
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
        return formState;
    }

    getSubForm(): Array<MatForm> {
        const forms: Array<MatForm> = [];
        for (const form of htmlCollectionToArray<any>(this.formRef.querySelectorAll('form'))) {
            if (form[FORM_PROPERTY_NAME] && form[FORM_PROPERTY_NAME] instanceof MatForm) {
                const nestedForm = form[FORM_PROPERTY_NAME] as MatForm;
                if (nestedForm.parent === this) {
                    forms.push(nestedForm);
                }
            } else {
                st.error('Using an nested form, please use <MatForm name="formName">', form);
            }
        }
        return forms;
    }

    reset() {
        this.formRef.reset();
    }
}