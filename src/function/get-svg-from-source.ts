import {TYPE_STRING} from "springtype/core/lang";

export const getSvgFromSource = async (srcOrModule: string| {default: string}): Promise<Element> => {
    let src;
    if(typeof srcOrModule === TYPE_STRING){
        src = srcOrModule;
    }else{
        src = (srcOrModule as any).default
    }
    const svgText =   await fetch(src).then( r => r.text());
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgText, "text/xml");

    // Get the SVG tag, ignore the rest
    const svg = xmlDoc.getElementsByTagName('svg')[0] as Element;
    // Add replaced image's ID to the new SVG

    // Remove any invalid XML tags as per http://validator.w3.org
    svg.removeAttribute('xmlns:a');

    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
    }
    return svg;
}