import { ControlProperties, Control } from './Control'


interface ProgressProperties extends ControlProperties {
    value?: number,
    label?: string,
    description?: string,   
}

class Progress extends Control {

    constructor(progressProps: ProgressProperties) {
        super(progressProps);
    }

    getControlName() {
        return "progress";
    }

    /* accessors */ 
    get value() {
        return this.attrs.value;
    }
    set value(newValue: number) {
        this.attrs.value = newValue;
    }
    get label() {
        return this.attrs.label;     
    }
    set label(newLabel: string) {
        this.attrs.label = newLabel;
    }
    get description() {
        return this.attrs.description;     
    }
    set description(newDescription: string) {
        this.attrs.description = newDescription;
    }
}

export = Progress;