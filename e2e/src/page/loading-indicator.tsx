import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatLoadingIndicator} from "../../../dist";
import {ref} from "springtype/core/ref";

@component
export class LoadingIndicatorPage extends st.component {

    @ref
    loadingIndicator: MatLoadingIndicator;

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatLoadingIndicator</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatLoadingIndicator visible={true} ref={{loadingIndicator: this}}/>
                    </div>

                    <div class={['col', 's12']}>
                        <a href="javascript:" onclick={() => this.loadingIndicator.setVisible(true)}
                           class="left modal-close waves-effect btn-footer-secondary waves-white btn mat-align-middle">
                            <i class="material-icons">visibility</i> &nbsp;Show
                        </a>
                    </div>

                    <div class={['col', 's12']}>
                        <br/>
                        <a href="javascript:" onclick={() => this.loadingIndicator.setVisible(false)}
                           class="left modal-close waves-effect btn-footer-secondary waves-white btn mat-align-middle">
                            <i class="material-icons">visibility_off</i> &nbsp;Hide
                        </a>
                    </div>

                </div>
            </form>
        </div>
    }
}
