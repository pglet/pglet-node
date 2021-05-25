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
        return this.attrs.get('value')[0];
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.attrs.get('label')[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get description() {
        return this.attrs.get('description')[0];     
    }
    set description(newDescription: string) {
        this.setAttr("description", newDescription);
    }
}

export = Progress;