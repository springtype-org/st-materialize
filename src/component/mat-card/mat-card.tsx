import { st } from "springtype/core";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import { component } from "springtype/web/component";

@component({ tag: 'div' })
export class MatCard extends st.component implements ILifecycle {

    class = ['card'];

    render() {
        return <fragment>
            <div class="card-content">
                {this.renderChildren()}
            </div>
        </fragment>
    }
}