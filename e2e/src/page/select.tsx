import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {MatForm} from "../../../src/component/form";
import {MatSelect} from "../../../src/component/mat-select/mat-select";
import {MatSelectItem} from "../../../src/component/mat-select/mat-select-item";
import {Container} from "../cmp/container";

@component
export class SelectPage extends st.component {
    @ref
    formRef!: MatForm;

    render() {
        return <div class={'container'}>
            <MatForm ref={{formRef: this}}>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>Mat-Select</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="One" label="OneValue">
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="multiple" label="Multiple" multiple={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="selected" label="Selected" multiple={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="readonlyWithValue" label="Readonly with value" multiple={true} readonly={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="readonlyWithoutValue" label="Readonly without value" multiple={true}
                                   readonly={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="disabled" label="disabled" multiple={true} disabled={true}>
                            {['value1', 'value2', 'value3'].map(v => <MatSelectItem value={v} label={v}
                                                                                    selected={true}/>)}
                        </MatSelect>
                    </div>
                    <div class={['col', 's12']}>
                        <MatSelect name="onwValueTransformer" label="Own value transformer" multiple={true}
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
            </MatForm>
        </div>
    }

    submitForm() {
        const formState = this.formRef.getState();
        console.log(formState)
    }

}