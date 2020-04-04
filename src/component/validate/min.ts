import {validatorNameFactory} from "springtype/core/validate/function/validator-name-factory";
import {TYPE_STRING} from "springtype/core/lang";
import {st} from "springtype/core";

const VALIDATOR_NAME = 'min';


export const min = (minimum: number | Date) => validatorNameFactory((value: number | Date): boolean => {
    if (typeof value === TYPE_STRING) {
        st.error('validator min can not be applied on string values')
    }
    if (typeof value === 'number' || value instanceof Date) {
        return value >= minimum;
    }
    return false;
}, VALIDATOR_NAME);

