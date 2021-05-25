import { ControlProperties, Control } from './Control'


interface ImageProperties extends ControlProperties {
    src?: string,
    alt?: string,
    title?: string,
    fit?: string,
    maximizeFrame?: boolean,
}

class Image extends Control {

    constructor(imageProps: ImageProperties) {
        super(imageProps);
    }

    getControlName() {
        return "image";
    }

    /* accessors */ 
    get src() {
        return this.attrs.get('src')[0];     
    }
    set src(newSrc: string) {
        this.setAttr("src", newSrc);
    }
    get alt() {
        return this.attrs.get('alt')[0];     
    }
    set alt(newAlt: string) {
        this.setAttr("alt", newAlt);
    }
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get fit() {
        return this.attrs.get('fit')[0];     
    }
    set fit(newFit: string) {
        this.setAttr("fit", newFit);
    }
    get maximizeFrame() {
        return this.attrs.get('maximizeFrame')[0];     
    }
    set maximizeFrame(newMaximizeFrame: boolean) {
        this.setAttr("maximizeFrame", newMaximizeFrame);
    }
}

export = Image;