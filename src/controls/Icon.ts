import { ControlProperties, Control } from '../Control'

interface ImageProperties extends ControlProperties {
    name?: string,
    color?: string,
    size?: string,
}

class Image extends Control {
    _props: ImageProperties
    constructor(imageProps: ImageProperties) {
        super(imageProps);
        this._props = imageProps
    }

    getControlName() {
        return "icon";
    }

    /* accessors */ 
    get name() {
        return this.getAttr('name', typeof(this._props.name));     
    }
    set name(newName: string) {
        this.setAttr("name", newName);
    }
    get color() {
        return this.getAttr('color', typeof(this._props.color));     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get size() {
        return this.getAttr('size', typeof(this._props.size));     
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
}

export = Image;