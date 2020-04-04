import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatInput} from "../../../src/component/mat-input/mat-input";
import {MatIcon} from "../../../src/component/mat-icon/mat-icon";

@component
export class InputPage extends st.component {

    render() {
        return <div class={'container'}>
            <form>

                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <MatInput label={'Test me I am a text'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'Placeholder here'} placeholder={'Placeholder here'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput type={'number'} label={'Test me I am a number'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'With value'} value={'With value'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput value={'Without label'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput id={'test'} label={'With value and disabled'} value={'With value and disabled'}
                                  disabled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'With value, disabled and helperText'}
                                  value={'With value, disabled and helperText'}
                                  disabled={true} helperText={'With value, disabled and helperText'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'With value as password'} value={'With value as password'}
                                  type="password"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'I am hidden'} value={'You can not see this value'}
                                  hidden={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'I am readonly'} value={'I am readonly'}
                                  readonly={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'Max length 14'} value={'Max length 14'}
                                  maxLength={13}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'Range between 5-10'} type="number" min={5} max={10}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'Range between 5-10'} type="date" min={new Date(1583451888178)}
                                  max={new Date(1585871088178)}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput label={'Own svg icon'} value={"Own svg icon"}>
                            <MatIcon src={require('../../static/icon/create-24px.svg')} class={['prefix']}/>
                        </MatInput>
                        <MatInput label={'Material Icons'} value={"Material Icons"}>
                            <i class="material-icons prefix">mode_edit</i>
                        </MatInput>
                        <MatInput label={'Character counter'} characterCounter={true}/>
                        <MatInput label={'Character counter with value '} characterCounter={true} value={'1234'}/>
                        <MatInput label={'Character counter with value and maxlength'} characterCounter={true}
                                  value={'yeah!!!'} maxLength={120}/>
                        <MatInput label={'Address'} characterCounter={true}
                                  helperText={'required *'}
                                  value={'Schnaupping 16'} maxLength={20}/>
                    </div>
                    <button type={"submit"}>submit</button>
                </div>
            </form>
        </div>
    }
}
