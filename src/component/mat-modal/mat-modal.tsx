import "./mat-modal.css"
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";


export interface IAttrMatModal {
    open?: boolean
    fixedFooter?: boolean
}

@component
export class MatModal extends st.component<IAttrMatModal> implements ILifecycle {
    static MAT_MODAL_FOOTER_SLOT_NAME = 'MAT_MODAL_FOOTER_SLOT_NAME';

    @attr
    open = false;

    @attr
    fixedFooter = true;


    render() {
        return <fragment>
            <div class={this.geOpenClass()} tabindex="0">
                <div class="modal-content">
                    {this.renderChildren()}
                </div>
                <div class="modal-footer">
                    {this.renderSlot(MatModal.MAT_MODAL_FOOTER_SLOT_NAME)}
                </div>
            </div>
            <div class={['modal-overlay']}/>
        </fragment>
    }

    geOpenClass() {
        const classes = ['modal'];
        if (this.fixedFooter) {
            classes.push('modal-fixed-footer');
        }
        if (this.state.open) {
            classes.push('open');
        }
        return classes;
    }

    toggle() {
        this.state.open = !this.state.open;
    }

}