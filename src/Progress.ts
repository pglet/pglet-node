import { ControlProperties, Control } from './Control'

interface ProgressProperties extends ControlProperties {
    value?: number,
    label?: string,
    description?: string,   
}

class Progress extends Control {
    _props: ProgressProperties
    constructor(progressProps: ProgressProperties) {
        super(progressProps);
        this._props = progressProps
    }

    getControlName() {
        return "progress";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get description() {
        return this.getAttr('description', typeof(this._props.description));     
    }
    set description(newDescription: string) {
        this.setAttr("description", newDescription);
    }
}

export = Progress;