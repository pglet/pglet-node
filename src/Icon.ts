import { ControlProperties, Control } from './Control'

interface ImageProperties extends ControlProperties {
    name?: string,
    color?: string,
    size?: string,
}

class Image extends Control {
    constructor(imageProps: ImageProperties) {
        super(imageProps);
    }

    getControlName() {
        return "image";
    }

    /* accessors */ 
    get name() {
        return this.attrs.get('name')[0];     
    }
    set name(newName: string) {
        this.setAttr("name", newName);
    }
    get color() {
        return this.attrs.get('color')[0];     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get size() {
        return this.attrs.get('size')[0];     
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
}

export = Image;