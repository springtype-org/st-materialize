import {tsx} from "springtype/web/vdom";
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {attr, component} from "springtype/web/component";

@component({tag: 'a'})
export class MatSideNavLogoContainer extends st.component implements ILifecycle {

    @attr
    href = "javascript:void(0)";

    class = ["brand-logo"];


    render() {
        return this.renderChildren()
    }

}