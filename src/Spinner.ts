import { ControlProperties, Control } from './Control'

interface SpinnerProperties extends ControlProperties {
    size?: string,
    label?: string,
    labelPosition?: string,   
}

class Spinner extends Control {
    constructor(spinnerProps: SpinnerProperties) {
        super(spinnerProps);
    }

    getControlName() {
        return "spinner";
    }

    /* accessors */ 
    get size() {
        return this.attrs.get('size')[0];
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get label() {
        return this.attrs.get('label')[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get labelPosition() {
        return this.attrs.get('labelPosition')[0];     
    }
    set labelPosition(newLabelPosition: string) {
        this.setAttr("labelPosition", newLabelPosition);
    }
}

export = Spinner;