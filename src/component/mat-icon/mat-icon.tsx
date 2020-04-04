import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";

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
      const response = await fetch(this.src);
      const svgText = await response.text();
       const parser = new DOMParser();
       const xmlDoc = parser.parseFromString(svgText, "text/xml");

       // Get the SVG tag, ignore the rest
       const svg = xmlDoc.getElementsByTagName('svg')[0];
       // Add replaced image's ID to the new SVG

       // Remove any invalid XML tags as per http://validator.w3.org
       svg.removeAttribute('xmlns:a');

       // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
       if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
           svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
       }

       // Replace image with new SVG
       this.el.innerHTML = svgText;
   }
}