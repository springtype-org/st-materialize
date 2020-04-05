import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";

@component
export class Center extends st.component {
    tag = 'center';

    render() {
        return this.renderChildren();
    }
}
