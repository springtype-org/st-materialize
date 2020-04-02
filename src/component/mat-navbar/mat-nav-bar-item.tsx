import "./mat-navbar.scss"
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {attr, component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";


@component({tag: 'a'})
export class MatNavBarItem extends st.component implements ILifecycle {

    class = ["waves-effect", "waves-block", "waves-light"];

    @attr
    href = "javascript:void(0);";

    render() {
        return this.renderChildren()
    }
}