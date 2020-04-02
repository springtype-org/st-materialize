import "./mat-loading-indicator.scss"
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {st} from "springtype/core";
import {ref} from "springtype/core/ref";

const MAT_LOADING_INDICATOR_VISIBILITY_CLASS = 'hide';

export interface IAttrMatLoadingIndicator {
    visible?: boolean;
}

@component
export class MatLoadingIndicator extends st.component<IAttrMatLoadingIndicator> {

    @ref
    indicatorRef: HTMLDivElement;

    @attr
    visible: boolean = true;

    toggle() {
        this.setVisible(!this.visible);
    }

    setVisible(visible: boolean) {
        this.visible = visible;
        this.indicatorRef.setAttribute('class',
            this.getIndicatorClasses().join(' ')
        );
    }

    shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
        return !(this.INTERNAL.notInitialRender && name == 'visible');
    }

    render() {
        return <div ref={{indicatorRef: this}}
                    class={this.getIndicatorClasses()}>
            <div class="indeterminate"/>
        </div>
    }

    getIndicatorClasses() {
        return ["progress", "mat-loading-indicator", !this.visible ? MAT_LOADING_INDICATOR_VISIBILITY_CLASS : '']
    }
}