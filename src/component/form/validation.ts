import {attr, component} from "springtype/web/component";
import {st} from "springtype/core";

export const DEFAULT_VALIDATION_EVENTS = ["change", "keyup"];

export interface IAttrValidation {
    eventListeners: Array<string>;
    validators: Array<(value: string | number | Date) => Promise<boolean>>;
}

export interface IValidationState {
    valid: boolean;
    validated: boolean;
    errors: [];
    value: string | Date | boolean | number;
}

@component
export class Validation extends st.component<IAttrValidation> {

    @attr
    eventListeners: Array<string> = DEFAULT_VALIDATION_EVENTS;

    @attr
    debounceTimeInMs: number = 250;

    @attr
    validators: Array<(value: string | number | Date) => Promise<boolean>> = [];

    target!: HTMLTextAreaElement | HTMLInputElement;

    validationReject!: (reason?: any) => void;

    timeout!: any;

    state!: IValidationState;

    render() {
        return this.renderChildren()
    }

    onConnect(): void {
        super.onConnect();
        for (const eventListener of this.eventListeners) {
            this.el.addEventListener(eventListener, this.onTargetEvent(eventListener));
        }
    }

    onDisconnect(): void {
        super.onDisconnect();
        for (const eventListener of this.eventListeners) {
            this.el.removeEventListener(eventListener, () => this.onTargetEvent(eventListener));
        }
    }

    onAfterRender(): void {
        const input = this.el.querySelector('input');
        if (input) {
            this.target = input as HTMLInputElement;
        } else {
            const textarea = this.el.querySelector('textarea');
            if (textarea) {
                this.target = textarea as HTMLTextAreaElement;
            }
        }
        if (!this.target) {
            st.error('Validator, missing textarea or input child')
        }
        st.debug('this.validators', this.validators)
    }

    async validate(force: boolean = false): Promise<boolean> {
        if (this.validationReject) {
            this.validationReject({reason: 'validation', message: `rejected validation ${this.target.name}`});
            delete this.validationReject;
        }

        try {
            return await new Promise<IValidationState>((resolve, reject) => {
                    this.validationReject = reject;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(async () => {
                            const value = this.getValue();
                            if (force || !this.state || this.state.value !== value) {
                                //set custom error
                                this.target.setCustomValidity(' ');

                                let valid = true;

                                if (this.target.type === 'radio') {
                                    const validationState = await this.doRadioValidation(value);
                                    valid = validationState.valid;
                                    this.state = Object.freeze(validationState);
                                } else {
                                    const errors: Array<string> = [];
                                    for (const validator of this.validators) {
                                        console.log('validating', (validator as any)['VALIDATOR_NAME']);
                                        if (!await validator(value)) {
                                            valid = false;
                                            errors.push((validator as any)['VALIDATOR_NAME']);
                                        }
                                    }
                                    this.state = Object.freeze({validated: true, value, valid, errors});
                                }

                                this.target.setCustomValidity(valid ? '' : ' ');
                                resolve(valid);
                            }

                        },
                        this.debounceTimeInMs
                    )
                }
            );
        } catch (e) {
        }
    }

    async doRadioValidation(value: string): Promise<IValidationSate> {
        let valid = true;
        const errors: Array<string> = [];
        let parent = (this.el as HTMLInputElement).form;
        if (parent) {
            const elements = parent.elements;
            if (elements.namedItem(this.name) instanceof RadioNodeList) {
                const radioList = elements.namedItem(this.name) as RadioNodeList;
                for (const radioInput of nodeListToArray<any>(radioList)) {
                    if (radioInput.$stComponent) {
                        // const component = (radioInput as any).$stComponent;
                        const validators = radioInput.$stComponent.validators;
                        if (validators.length > 0) {
                            for (const validator of validators) {
                                if (!await validator(value)) {
                                    valid = false;
                                    errors.push((validator as any)[VALIDATION_VALIDATOR_NAME]);
                                }
                            }
                            break;
                        }
                    }
                }
                for (let i = 0; i < radioList.length; i++) {
                    const radioInput = radioList.item(i);
                    if (radioList && (radioInput as any).$stComponent) {
                        const component = (radioInput as any).$stComponent as Input;
                        component.validationState = ({valid, errors, value});
                        component.updateValidation();
                    }
                }
            }
        }
        return {validated: true, valid, errors, value}
    }

    onTargetEvent = (eventListener: string) => (evt: Event) => {
        if (this.target === evt.target) {
            //do validation
            try {


                this.validate();
            } catch (e) {

            }
        }
    };

    getValue() {
        if (this.target instanceof HTMLInputElement) {
            return this.getInputValue(this.target);
        }
        if (this.target instanceof HTMLTextAreaElement) {
            return this.getTextAreaValue(this.target);
        }
    }

    getInputValue(input: HTMLInputElement): boolean | string | number | Date | null {
        const type = input.type;
        switch (type) {
            case 'number':
                return input.valueAsNumber;
            case 'date':
                return input.valueAsDate;
            case 'checkbox':
                return input.checked;
            case 'radio':
                const form = (this.el as HTMLInputElement).form;
                if (form &&
                    form.elements &&
                    form.elements.namedItem(this.name) &&
                    form.elements.namedItem(this.name) instanceof RadioNodeList) {
                    return (form.elements.namedItem(this.name) as RadioNodeList).value;
                }
        }
        return input.value
    }

    getTextAreaValue(textArea: HTMLTextAreaElement): string {
        return textArea.value;
    }
}