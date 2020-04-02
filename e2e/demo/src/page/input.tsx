import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {MatTextNumberInput} from "../../../../src/component/mat-input/mat-text-number-input";
import { tsx } from "springtype/web/vdom";

@component
export class InputPage extends st.component {

    render() {
        return <div class={'container'}>
            <div class={'row'}>
                <div class={['col', 's12']}>
                    <MatTextNumberInput label={'Test me'} onKeyUp={() => this.onKeyUp}/>
                </div>
                <div class={['col', 's12']}>
                    <MatTextNumberInput label={'With value'} value={'With value'} onKeyUp={() => this.onKeyUp}/>
                </div>
                <div class={['col', 's12']}>
                    <MatTextNumberInput label={'With value as password'} value={'With value as password'}
                                        type="password" onKeyUp={() => this.onKeyUp}/>
                </div>
            </div>
        </div>
    }

    onAfterRender(hasDOMChanged: boolean): void {
        setTimeout(() => {
            this.doRender()
        }, 500);
    }

    onKeyUp = () => {
        console.log('outer key up')
    }
}