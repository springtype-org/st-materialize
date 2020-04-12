import {validatorNameFactory} from "springtype/core/validate/function/validator-name-factory";
import {TYPE_STRING} from "springtype/core/lang";
import {st} from "springtype/core";

const VALIDATOR_NAME = 'min';

export const max = (maximum: number | Date) => validatorNameFactory((value: number | Date): boolean => {
    if (typeof value === TYPE_STRING) {
        st.error('validator max can not be applied on string values')
    }
    if (typeof value === 'number' || value instanceof Date) {
        return value <= maximum;
    }
    return false;
}, VALIDATOR_NAME);

