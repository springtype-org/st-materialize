import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatIcon, MatTextArea} from "../../../src/component";

@component
export class TextAreaPage extends st.component {

    render() {
        return <div class={'container'}>
            <form>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>Mat-TextArea</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Test me I am a text'} formIgnore={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Placeholder here'} placeholder={'Placeholder here'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'With value'} value={'With value'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea value={'Without label'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea id={'test'} label={'With value and disabled'} value={'With value and disabled'}
                                     disabled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'With value, disabled and helperText'}
                                     value={'With value, disabled and helperText'}
                                     disabled={true} helperText={'With value, disabled and helperText'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'I am hidden'} value={'You can not see this value'}
                                     hidden={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'I am readonly'} value={'I am readonly'}
                                     readonly={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Max length 14'} value={'Max length 14'}
                                     maxLength={13}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Own svg icon'} value={"Own svg icon"}>
                            <MatIcon src={require('../../static/icon/springtype-logo.svg')} class={['prefix']}/>
                        </MatTextArea>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Material Icons'} value={"Material Icons"}>
                            <i class="material-icons prefix">mode_edit</i>
                        </MatTextArea>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Character counter'} characterCounter={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Character counter with value '} characterCounter={true} value={'1234'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Character counter with value and maxlength'} characterCounter={true}
                                     value={'yeah!!!'} maxLength={120}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'Address'} characterCounter={true}
                                     helperText={'required *'}
                                     value={'Schnaupping 16'} maxLength={20}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'2 rows'} characterCounter={true} maxLength={50} rows={2}
                                     value="sdfsdfsdfsdfsdfdfss
dfsfdfdssfdfsds
fdsfdfsd"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea label={'2 rows'} characterCounter={true} maxLength={50} rows={2}/>
                    </div>
                </div>
            </form>
        </div>
    }
}
