import {attr, component} from "springtype/web/component";
import {st} from "springtype/core";
import {IValidator} from "springtype/core/validate/interface/ivalidator";

export const DEFAULT_VALIDATION_EVENTS = ["change", "keyup"];

@component
export class Validation extends st.staticComponent {

    @attr
    eventListeners: Array<string> = DEFAULT_VALIDATION_EVENTS;

    @attr
    validators: Array<IValidator> = [];

    @attr
    converter: (value: string | boolean) => any;

    value: string;

    render() {
        return this.renderChildren()
    }

    onConnect(): void {
        super.onConnect();
        for (const eventListener of this.eventListeners) {
            this.el.addEventListener(eventListener, this.onValidate(eventListener));
        }
    }

    onDisconnect(): void {
        super.onDisconnect();
        for (const eventListener of this.eventListeners) {
            this.el.removeEventListener(eventListener, () => this.onValidate(eventListener));
        }
    }

    onValidate = (eventListener: string) => (evt: Event) => {
        const target = evt.target;
        st.debug('onValidate', eventListener, target);
        if (target instanceof HTMLInputElement) {
            st.debug('onValidate', 'is HTMLInputElement');
            this.onInputValidation(target)
        } else if (target instanceof HTMLTextAreaElement) {
            st.debug('onValidate', 'is HTMLTextAreaElement');
            this.onTextAreaValidation(target)
        }
    };

    onInputValidation(input: HTMLInputElement) {
        const type = input.type;
        let value;
        switch (type) {
            case 'number':
                value = input.valueAsNumber;
                break;
            case 'date':
                value = input.valueAsDate;
                break;
            //todo: radio
            default:
                value = input.value
        }
    }

    onTextAreaValidation(textArea: HTMLTextAreaElement) {
        return textArea.innerText;
    }
}