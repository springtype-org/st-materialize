import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatCard} from "../../../dist";

@component
export class CardPage extends st.component {

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatCard</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCard>
                            Test
                        </MatCard>
                    </div>
                </div>
            </form>
        </div>
    }
}
