import { ControlProperties, Control } from './Control'

interface ImageProperties extends ControlProperties {
    src?: string,
    alt?: string,
    title?: string,
    fit?: string,
    maximizeFrame?: boolean,
}

class Image extends Control {
    _props: ImageProperties
    constructor(imageProps: ImageProperties) {
        super(imageProps);
        this._props = imageProps
    }

    getControlName() {
        return "image";
    }

    /* accessors */ 
    get src() {
        return this.getAttr('src', typeof(this._props.src));     
    }
    set src(newSrc: string) {
        this.setAttr("src", newSrc);
    }
    get alt() {
        return this.getAttr('alt', typeof(this._props.alt));     
    }
    set alt(newAlt: string) {
        this.setAttr("alt", newAlt);
    }
    get title() {
        return this.getAttr('title', typeof(this._props.title));     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get fit() {
        return this.getAttr('fit', typeof(this._props.fit));     
    }
    set fit(newFit: string) {
        this.setAttr("fit", newFit);
    }
    get maximizeFrame() {
        return this.getAttr('maximizeFrame', typeof(this._props.maximizeFrame));     
    }
    set maximizeFrame(newMaximizeFrame: boolean) {
        this.setAttr("maximizeFrame", newMaximizeFrame);
    }
}

export = Image;