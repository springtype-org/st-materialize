import {component} from "springtype/web/component";
import {st} from "springtype/core";

@component
export class Container extends st.component {

    render() {
        return this.renderChildren();
    }
}
