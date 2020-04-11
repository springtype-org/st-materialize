import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {st} from "springtype/core";
import {ref} from "springtype/core/ref";

export interface IMatLoadingIndicatorAttrs {
    visible?: boolean;
}

export const MAT_LOADING_INDICATOR_HIDE_CLASS = "hide";

@component
export class MatLoadingIndicator extends st.component<IMatLoadingIndicatorAttrs> {

    @attr
    visible: boolean = true;

    @ref
    container!: HTMLElement;

    toggle() {
        this.visible = !this.visible;
        this.setVisible(this.visible);
    }

    setVisible(visible: boolean) {
        this.visible = visible;
        //always remove first class
        this.container.classList.remove(MAT_LOADING_INDICATOR_HIDE_CLASS);
        if (!visible) {
            this.container.classList.add(MAT_LOADING_INDICATOR_HIDE_CLASS);
        }
    }

    render() {
        return <div ref={{container: this}}
                    class={["progress", "mat-loading-indicator", !this.visible ? MAT_LOADING_INDICATOR_HIDE_CLASS : '']}>
            <div class="indeterminate"/>
        </div>
    }
}