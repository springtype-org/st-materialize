import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";

export interface IAttrMatNavBarItem {
}


@component({tag: 'ul'})
export class MatDropdownContent extends st.component<IAttrMatNavBarItem> implements ILifecycle {

    tabIndex = "0";

    class = ['dropdown-content'];


    render() {
        return this.renderChildren();

    }


}