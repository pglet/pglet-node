import { ControlProperties, Control } from './Control'

interface SpinnerProperties extends ControlProperties {
    size?: string,
    label?: string,
    labelPosition?: string,   
}

class Spinner extends Control {
    _props: SpinnerProperties
    constructor(spinnerProps: SpinnerProperties) {
        super(spinnerProps);
        this._props = spinnerProps
    }

    getControlName() {
        return "spinner";
    }

    /* accessors */ 
    get size() {
        return this.getAttr('size', typeof(this._props.size));
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get labelPosition() {
        return this.getAttr('labelPosition', typeof(this._props.labelPosition));     
    }
    set labelPosition(newLabelPosition: string) {
        this.setAttr("labelPosition", newLabelPosition);
    }
}

export = Spinner;