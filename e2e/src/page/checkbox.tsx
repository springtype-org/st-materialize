import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {Container} from "../cmp/container";
import {ref} from "springtype/core/ref";
import {Form, MatCheckbox} from "../../../dist";

@component
export class CheckboxPage extends st.component {
    @ref
    formRef!: Form;

    render() {
        return <div class={'container'}>
            <Form ref={{formRef: this}}>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>Mat-Checkbox</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="normal" label="Normal"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="checked" label="Checked" checked={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="checkedFilled" label="Checked filled" checked={true} filled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="disabled" label="Disabled" disabled/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="disabledChecked" label="Disabled checked" disabled checked={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="disabledCheckedFilled" label="disabled checked filled" disabled
                                     checked={true} filled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatCheckbox name="required" label="Required" required={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <Container tag={"center"}>
                            <button class="btn" onClick={() => this.submitForm()}>Validate</button>
                        </Container>
                    </div>
                </div>
            </Form>
        </div>
    }

    async submitForm() {
        const formValidationResult = await this.formRef.validate<any>(true);
        console.log('formValidationResult', formValidationResult, this.formRef.getState());
    }

}
