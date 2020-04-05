import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { MatCheckbox } from "../../../src/component";

@component
export class CheckboxPage extends st.component {

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatCheckbox</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="foo" label="Foo me!" />
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="foo" label="Foo me!" disabled />
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="foo" label="Foo me!" required={true} />
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="foo" label="Foo me!" checked={true} />
                    </div>
                </div>
            </form>
        </div>
    }
}
