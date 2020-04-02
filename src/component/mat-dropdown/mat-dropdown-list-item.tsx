import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";


@component({tag: 'li'})
export class MatDropdownListItem extends st.component implements ILifecycle {

    tabIndex = "0";

    render() {
        return this.renderChildren()
    }

}