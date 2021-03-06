import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {MatSelect, MatSelectItem, select_required} from "../../../src/component";
import {Container} from "../cmp/container";
import {MatIcon} from "../../../src/component";
import {resolveRequire} from "../../../src/component/function/resolve-require";
import {Form} from "st-form";
import {REQUIRED} from "st-validate";


@component
export class SelectPage extends st.component {
    @ref
    formRef!: Form;

    render() {
        return <div class={'container'}>
            <Form ref={{formRef: this}}>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>Mat-Select</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="One" label="OneValue"
                                   onSelectItem={(evt) => console.log('selected', evt.detail)}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="single-deselect" label="Single deselect" type={'single-deselect'}
                                   onSelectItem={(evt) => console.log('selected', evt.detail)}
                                   onDeselectItem={(evt) => console.log('deselected', evt.detail)}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="One" label="OneValue"
                                   validators={[select_required]}
                                   validationErrorMessages={{
                                       [REQUIRED]: 'This field is required',
                                       same: 'Password are not equal'
                                   }}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="multiple" label="Multiple" type={'multiple'}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="selected" label="Selected" type={'multiple'}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="readonlyWithValue" label="Readonly with value" type={'multiple'}
                                   readonly={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="readonlyWithoutValue" label="Readonly without value" type={'multiple'}
                                   readonly={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="disabled" label="disabled" type={'multiple'} disabled={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="image" label="image">
                            <MatSelectItem value={'GOAT'} label={'Goat'} selected={true}>
                                <img class={'left'} src={resolveRequire(resolveRequire(require('../static/images/goat.svg')))}/>
                            </MatSelectItem>
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="imageColored" label="imageColored">
                            <MatSelectItem value={'GOAT_1'} label={'Goat'} selected={true}>
                                <MatIcon class="color left" src={resolveRequire(require('../static/images/goat.svg'))}/>
                            </MatSelectItem>
                            <MatSelectItem value={'GOAT_2'} label={'Goat'}>
                                <MatIcon class="color left" src={resolveRequire(require('../static/images/goat.svg'))}/>
                            </MatSelectItem>
                        </MatSelect>
                    </div>

                    <div class={['col', 's12']}>
                        <MatSelect name="onwValueTransformer" label="Own value transformer" type={'multiple'}
                                   valueTransformer={(selected: Array<MatSelectItem>) => {
                                       return selected.map(v => v.item)
                                   }}
                                   onSelectItem={(evt) => {
                                       console.log('selected', evt.detail)
                                   }}
                                   onDeselectItem={(evt) => {
                                       console.log('deselected', evt.detail)
                                   }}>
                            {[{
                                accountId: 1,
                                name: 'michael',
                                email: 'michael@springtype.org',
                                active: true
                            }, {accountId: 2, name: 'aron', email: 'aron@springtype.org', active: false}]
                                .map(item => <MatSelectItem value={item.accountId.toString()} label={item.name}
                                                            selected={item.active} item={item}/>)
                            }
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <Container tag={"center"}>
                            <button class="btn" onclick={() => this.submitForm()}>Validate</button>
                        </Container>
                    </div>
                </div>
            </Form>
        </div>
    }

    submitForm() {
        const formState = this.formRef.validate();
        console.log(formState)
    }

}
