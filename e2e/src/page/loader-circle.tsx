import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatLoaderCircle} from "../../../dist";
import {ref} from "springtype/core/ref";

@component
export class LoaderCirclePage extends st.component {

    @ref
    loaderCircle: MatLoaderCircle;

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatLoaderCircle</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatLoaderCircle ref={{loaderCircle: this}}/>
                    </div>

                    <div class={['col', 's12']}>
                        <a href="javascript:" onclick={() => this.loaderCircle.setVisible(true)}
                           class="left modal-close waves-effect btn-footer-secondary waves-white btn mat-align-middle">
                            <i class="material-icons">visibility</i> &nbsp;Show
                        </a>
                    </div>

                    <div class={['col', 's12']}>
                        <br/>
                        <a href="javascript:" onclick={() => this.loaderCircle.setVisible(false)}
                           class="left modal-close waves-effect btn-footer-secondary waves-white btn mat-align-middle">
                            <i class="material-icons">visibility_off</i> &nbsp;Hide
                        </a>
                    </div>

                </div>
            </form>
        </div>
    }
}
