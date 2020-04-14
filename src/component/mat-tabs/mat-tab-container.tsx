import {st} from "springtype/core";
import {attr, component} from "springtype/web/component";
import {ILifecycle} from "springtype/web/component/interface";

export interface IAttrMatTabContainer {
    dataTabId: string;
}

@component
export class MatTabContainer extends st.component<IAttrMatTabContainer> implements ILifecycle {


    @attr
    dataTabId: string = '';

    class = ['hide']

    render() {
        return this.renderChildren()
    }

    onAfterElCreate(): void {
        this.el.setAttribute('data-tab-id', this.dataTabId);
    }
}