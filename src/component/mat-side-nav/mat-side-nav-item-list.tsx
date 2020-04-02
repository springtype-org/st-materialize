import {tsx} from "springtype/web/vdom";
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {component} from "springtype/web/component";

@component({tag: 'ul'})
export class MatSideNavItemList extends st.component implements ILifecycle {

    class = ["sidenav", "sidenav-collapsible", "leftside-navigation", "collapsible", "sidenav-fixed", "menu-shadow", "ps", "ps--active-y"];

    render() {
        return this.renderChildren();
    }


}