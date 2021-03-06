import { ControlProperties, Control } from './Control'


interface TextProperties extends ControlProperties {
    value: string,
    align?: string,
    size?: string,   
}

class Text extends Control {

    constructor(textProps: TextProperties) {
        super(textProps);
        // does this need to be called??
        //super.attrs = textProps
    }

    getControlName() {
        return "text";
    }

    /* accessors */ 
    get value() {
        return this.attrs.value[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get align() {
        return this.attrs.align[0];     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get size() {
        return this.attrs.size[0];     
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
}

export = Text;