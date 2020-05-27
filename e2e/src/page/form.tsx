import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {Container} from "../cmp/container";
import {MatInput} from "../../../src/component";
import {required} from "st-validate";
import {Form} from "st-form";

@component
export class FormPage extends st.component {

    @ref
    outerMatFormRef: Form;

    render() {
        return <div class={'container'}>
            <Form ref={{outerMatFormRef: this}}>
                <Container>
                    <Container>
                        <Container>

                            <Form name={'person'}>
                                <MatInput name="firstName" label={'Test me I am a text'} validators={[required]}
                                          validationErrorMessages={{
                                              'required': 'hey please set me',
                                          }}/>
                                <MatInput name="lastName" label={'Test me I am a text'} validators={[required]}
                                          validationErrorMessages={{
                                              'required': 'hey please set me',
                                          }}/>
                                <Form name={'cv'}>
                                    <MatInput onValidation={(evt) => console.log('onValidation', evt)} name="yeah"
                                              label={'Test me I am a text'}
                                              minLength={8}
                                              validators={[required]}
                                              validationErrorMessages={{
                                                  'required': 'hey please set me',
                                                  'min-length': 'the minimum length is 8'
                                              }}/>
                                </Form>
                            </Form>
                            <Form name={'address'}>
                                <div class={['col', 's12']}>
                                    <MatInput name="dateRange" label={'Range between dates'} type="date"
                                              min={new Date(1583451888178)}
                                              max={new Date(1585871088178)}/>
                                </div>
                            </Form>

                        </Container>
                    </Container>
                </Container>
            </Form>
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
