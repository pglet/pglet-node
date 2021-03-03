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
        return this.attrs.value;     
    }
    set value(newValue: string) {
        this.attrs.value = newValue;
    }
    get align() {
        return this.attrs.align;     
    }
    set align(newAlign: string) {
        this.attrs.align = newAlign;
    }
    get size() {
        return this.attrs.size;     
    }
    set size(newSize: string) {
        this.attrs.size = newSize;
    }
}

export = Text;