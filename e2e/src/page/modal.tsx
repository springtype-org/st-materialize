import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { MatModal } from "../../../src/component";
import { ref } from "springtype/core/ref";

@component
export class ModalPage extends st.component {

    @ref
    testModal: MatModal;

    openModal = () => {
        console.log('Open modal')
        this.testModal.toggle();
    }

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatModal</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <a class="btn" href="javascript:" onClick={this.openModal}>Open Modal</a>
                    </div>
                </div>
            </form>

            <MatModal ref={{ testModal: this }}>

                <h4 class={'center'}>Test modal</h4>

                Nice modal.

            <template slot={MatModal.MAT_MODAL_FOOTER_SLOT_NAME}>
                    <a href="javascript:" onclick={() => this.testModal.toggle()} class="left modal-close waves-effect btn-footer-secondary waves-white btn mat-align-middle"><i class="material-icons">highlight_off</i> &nbsp;Close</a>
                    <a href="javascript:" onclick={() => this.testModal.toggle()} class="modal-close waves-effect waves-green btn mat-align-middle"><i class="material-icons">done_all</i>&nbsp;OK</a>
                </template>
            </MatModal>
        </div>
    }
}
