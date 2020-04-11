import {component} from "springtype/web/component";
import {st} from "springtype/core";
import {IEventListener} from "springtype/web/component/interface";
import {MatSelectItemClickDetail} from "./mat-select-item";

export interface IAttrMatDropDown {
    onMatSelectItemClick?: IEventListener<MatSelectItemClickDetail>

}

export const DROP_DOWN_SHOW_CLASS = 'show';

@component
export class MatDropDown extends st.component<IAttrMatDropDown> {
    class = ['dropdown-content', 'select-dropdown'];
    tag = 'ul';

    render() {
        return this.renderChildren();
    }

    onAfterRender(): void {
        this.el.setAttribute('tabindex', '0')
    }

    show(show: boolean) {
        let classes = this.class;
        if (!Array.isArray(classes)) {
            classes = [classes];
        }
        classes = classes.filter(clazz => DROP_DOWN_SHOW_CLASS != clazz)
        if (show) {
            classes.push(DROP_DOWN_SHOW_CLASS)
        }
        this.class = classes;
    }
}