import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {getUniqueHTMLId, MatTab, MatTabContainer, MatTabs} from "../../../src";
import {Form} from "st-form";

@component
export class TabsPage extends st.component {

    render() {
        const firstDataTabId = getUniqueHTMLId();
        const secondDataTabId = getUniqueHTMLId();
        const thirdDataTabId = getUniqueHTMLId();
        return <div class={'container'}>
            <div class={'row'}>
                <div class={['col', 's12']}>
                    <h4>Mat-Tabs</h4>
                </div>
                <MatTabs class={['col', 's12']}>
                    <MatTab dataId={firstDataTabId} class={['col', 's4']} label={'First tab'}/>
                    <MatTab dataId={secondDataTabId} class={['col', 's4']} label={'Second tab'}/>
                    <MatTab dataId={thirdDataTabId} class={['col', 's4']} label={'Third tab'}/>
                </MatTabs>
                <MatTabContainer class={['col', 's12']} dataTabId={firstDataTabId}>
                    <div>first</div>
                </MatTabContainer>
                <MatTabContainer class={['col', 's12']} dataTabId={secondDataTabId}>
                    <div>second</div>

                </MatTabContainer>
                <MatTabContainer class={['col', 's12']} dataTabId={thirdDataTabId}>
                    <div>third</div>
                </MatTabContainer>
            </div>
        </div>
    }
}
