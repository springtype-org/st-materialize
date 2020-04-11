import {component} from "springtype/web/component";
import {st} from "springtype/core";
import {IEventListener, ILifecycle} from "springtype/web/component/interface";
import {MatSelectItemClickDetail} from "./mat-select-item";

export interface IAttrMatSelectItemList {
    onMatSelectItemClick?: IEventListener<MatSelectItemClickDetail>
}

@component({tag: 'ul'})
export class MatSelectItemList extends st.component<IAttrMatSelectItemList> implements ILifecycle {


    tabindex = "0";

    class = ["dropdown-content", "select-dropdown"];

    render() {
        return this.renderChildren();
    }
}

