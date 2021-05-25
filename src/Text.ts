import { ControlProperties, Control } from './Control'

interface TextProperties extends ControlProperties {
    value: string,
    align?: string,
    size?: string  
}

class Text extends Control {

    constructor(textProps: TextProperties) {
        super(textProps);
    }

    getControlName() {
        return "text";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
        // return this.getAttr('value');
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get align() {
        return this.attrs.get('align')[0];     
        // return this.getAttr('align');;
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get size() {
        return this.attrs.get('size')[0];     
        // return this.getAttr('size');
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
}

export = Text;