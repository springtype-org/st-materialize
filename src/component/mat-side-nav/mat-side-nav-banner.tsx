import {tsx} from "springtype/web/vdom";
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {component} from "springtype/web/component";
import {ref} from "springtype/core/ref";

@component({tag: 'div'})
export class MatSideNavBanner extends st.component implements ILifecycle {


    @ref
    lockedRef: HTMLElement;

    class = ["brand-sidebar"];

    render() {
        return <h1 class="logo-wrapper">
            {this.renderChildren()}
        </h1>
    }
}