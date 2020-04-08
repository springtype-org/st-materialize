import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {Container} from "../cmp/container";
import {MatForm} from "../../../src/component/form";
import {MatTextArea} from "../../../src/component";

@component
export class TextAreaPage extends st.component {
    @ref
    formRef!: MatForm;

    render() {
        return <div class={'container'}>
            <MatForm ref={{formRef: this}}>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatTextArea</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="formIgnore" label={'Test me I am a text'} formIgnore={true}
                                     validationErrorMessages={{'min-length': 'huhu min length'}} minLength={8} helperText={'min-length 8'} />
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="placeholder" label={'Placeholder here'} placeholder={'Placeholder here'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="withLabel" label={'With value'} value={'With value'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="withoutLabel" value={'Without label'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="ValueAndDisabled" label={'With value and disabled'}
                                     value={'With value and disabled'}
                                     disabled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="WithValueAndDisabledAndHelperText"
                                     label={'With value, disabled and helperText'}
                                     value={'With value, disabled and helperText'}
                                     disabled={true} helperText={'With value, disabled and helperText'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="hiddenInput"
                                     label={'I am hidden'}
                                     value={'You can not see this value'}
                                     hidden={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="readonly" label={'I am readonly'} value={'I am readonly'}
                                     readonly={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="maxLength14" label={'Max length 14'} value={'Max length 14'}
                                     maxLength={13}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="withCustomIcon" label={'Own svg icon'} value={"Own svg icon"}>
                            <MatIcon src={require('../../static/icon/springtype-logo.svg')} class={['prefix']}/>
                        </MatTextArea>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="withMaterialIcon" label={'Material Icons'} value={"Material Icons"}>
                            <i class="material-icons prefix">mode_edit</i>
                        </MatTextArea>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="withCharacterCounter" label={'Character counter'} characterCounter={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="characterCounterAndValue" label={'Character counter with value '}
                                     characterCounter={true} value={'1234'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="characterCounterAndValueAndMaxlength120"
                                     label={'Character counter with value and maxlength'} characterCounter={true}
                                     value={'yeah!!!'} maxLength={120}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="address" label={'Address'} characterCounter={true}
                                     helperText={'required *'}
                                     value={'Schnaupping 16'} maxLength={20}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="rows2AndValue" label={'2 rows'} characterCounter={true} maxLength={50}
                                     rows={2}
                                     value="sdfsdfsdfsdfsdfdfss
dfsfdfdssfdfsds
fdsfdfsd"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatTextArea name="rows2NoValue" label={'2 rows'} characterCounter={true} maxLength={50}
                                     rows={2}/>
                    </div>
                    <div class={['col', 's12']}>
                        <Container tag={"center"}>
                            <button class="btn" onClick={() => this.submitForm()}>Validate</button>
                        </Container>
                    </div>
                </div>
            </MatForm>
        </div>
    }

    async submitForm() {
        const formValidationResult = await this.formRef.validate<any>(true);
        console.log('formValidationResult', formValidationResult, this.formRef.getState());
    }

}
