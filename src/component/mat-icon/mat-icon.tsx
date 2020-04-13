import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {getSvgFromSource} from "../../function/get-svg-from-source";

export interface AttrMatIcon {
    src: string;
}

@component
export class MatIcon extends st.component<AttrMatIcon> implements ILifecycle {
    @attr
    src!: string;

    tag = 'i';

    class = ['mat-icon'];


    render() {
        return <fragment/>
    }

    async onAfterRender() {
        super.onAfterRender();
        let svgFromSource = await getSvgFromSource(this.src);
        // Replace image with new SVG
        this.el.appendChild(svgFromSource);
    }
}