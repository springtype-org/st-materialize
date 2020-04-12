import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";

export interface IMatModalAttrs {
    fixedFooter?: boolean;
    open?: boolean;
}


@component
export class MatModal extends st.component<IMatModalAttrs> implements ILifecycle {

    static MAT_MODAL_FOOTER_SLOT_NAME = 'MAT_MODAL_FOOTER_SLOT_NAME';

    @attr
    fixedFooter: boolean = true;

    @attr
    open: boolean = false

    @ref
    containerRef!: HTMLElement;


    render() {
        return <fragment>
            <div ref={{containerRef: this}} class={this.getContainerClasses()} tabindex="0">
                <div class="modal-content">
                    {this.renderChildren()}
                </div>
                <div class="modal-footer">
                    {this.renderSlot(MatModal.MAT_MODAL_FOOTER_SLOT_NAME)}
                </div>
            </div>
            <div class={['modal-overlay']} onClick={() => this.setVisible(false)}/>
        </fragment>
    }

    setVisible(isVisible: boolean) {
        this.open = isVisible;
        this.containerRef.setAttribute('class', this.getContainerClasses());
    }

    toggle() {
        this.open = !this.open;
        this.setVisible(this.open);
    }

    getContainerClasses() {
        const classes = ['modal']
        if (this.fixedFooter) {
            classes.push('modal-fixed-footer')
        }
        if (this.open) {
            classes.push('open')
        }
        return classes.join(' ');
    }
}