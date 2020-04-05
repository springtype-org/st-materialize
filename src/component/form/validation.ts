import {attr, component} from "springtype/web/component";
import {st} from "springtype/core";
import {IValidator} from "springtype/core/validate/interface/ivalidator";

export const DEFAULT_VALIDATION_EVENTS = ["change", "keyup"];

export interface IAttrValidation {
    eventListeners: Array<string>;
    validators: Array<IValidator>;
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
    debounceTimeInMs!: number;

    @attr
    validators: Array<IValidator> = [];

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
    }

    async validate(force: boolean = false) {
        if (this.validationReject) {
            try {
                this.validationReject({reason: 'validation', message: `rejected validation ${this.target.name}`});
            } catch (e) {
            }
            delete this.validationReject;
        }

        return new Promise<IValidationState>((resolve, reject) => {
            this.validationReject = reject;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                    const value = this.getValue();
                    if (force || this.state.value !== value) {
                        this.target.setCustomError(true);
                        this.validationState = await this.doValidation(value);
                        this.updateValidation();
                    }
                    resolve(this.validationState);
                },
                this.validationDebounceTimeInMs || st.form.debounceTimeInMs
            )
        });

    }

    onTargetEvent = (eventListener: string) => (evt: Event) => {
        if (this.target === evt.target) {
            //do validation
            this.validate();
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
        return textArea.innerText;
    }
}