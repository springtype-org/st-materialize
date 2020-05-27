import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {MatForm} from "../../../src/component/form";
import {ref} from "springtype/core/ref";
import {Container} from "../cmp/container";
import {MatInput} from "../../../src/component";
import {required} from "st-validate";

@component
export class FormPage extends st.component {

    @ref
    outerMatFormRef: MatForm;

    render() {
        return <div class={'container'}>
            <MatForm ref={{outerMatFormRef: this}}>
                <Container>
                    <Container>
                        <Container>

                            <MatForm name={'person'}>
                                <MatInput name="firstName" label={'Test me I am a text'} validators={[required]}
                                          validationErrorMessages={{
                                              'required': 'hey please set me',
                                          }}/>
                                <MatInput name="lastName" label={'Test me I am a text'} validators={[required]}
                                          validationErrorMessages={{
                                              'required': 'hey please set me',
                                          }}/>
                                <MatForm name={'cv'}>
                                    <MatInput onValidation={(evt) => console.log('onValidation', evt)} name="yeah"
                                              label={'Test me I am a text'}
                                              minLength={8}
                                              validators={[required]}
                                              validationErrorMessages={{
                                                  'required': 'hey please set me',
                                                  'min-length': 'the minimum length is 8'
                                              }}/>
                                </MatForm>
                            </MatForm>
                            <MatForm name={'address'}>
                                <div class={['col', 's12']}>
                                    <MatInput name="dateRange" label={'Range between dates'} type="date"
                                              min={new Date(1583451888178)}
                                              max={new Date(1585871088178)}/>
                                </div>
                            </MatForm>

                        </Container>
                    </Container>
                </Container>
            </MatForm>
            <div class={['col', 's12']}>
                <Container tag={"center"}>
                    <button class="btn" onClick={() => this.submitForm()}>Validate</button>
                </Container>
            </div>
        </div>
    }

    submitForm() {
        console.log('validate', this.outerMatFormRef.validate());
        console.log('state', this.outerMatFormRef.getState());
    }
}
