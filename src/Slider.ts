import { ControlProperties, Control } from './Control'


interface SliderProperties extends ControlProperties {
    value?: number,
    label?: string,
    min?: number,
    max?: number,
    step?: number,
    showValue?: boolean,
    valueFormat?: string, 
    vertical?: boolean,
    data?: string,
    onChange?: any 
}

class Slider extends Control {

    constructor(sliderProps: SliderProperties) {
        super(sliderProps);
        if (sliderProps.onChange) {
            super.addEventHandler("change", sliderProps.onChange);
        }
    }

    getControlName() {
        return "slider";
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
    get min() {
        return this.attrs.get('min')[0];     
    }
    set min(newMin: number) {
        this.setAttr("min", newMin);
    }
    get max() {
        return this.attrs.get('min')[0];     
    }
    set max(newMax: number) {
        this.setAttr("max", newMax);
    }
    get step() {
        return this.attrs.get('step')[0];     
    }
    set step(newStep: number) {
        this.setAttr("step", newStep);
    }
    get showValue() {
        return this.attrs.get('showValue')[0];     
    }
    set showValue(newShowValue: boolean) {
        this.setAttr("showValue", newShowValue);
    }
    get valueFormat() {
        return this.attrs.get('valueFormat')[0];     
    }
    set valueFormat(newValueFormat: string) {
        this.setAttr("valueFormat", newValueFormat);
    }
    get vertical() {
        return this.attrs.get('vertical')[0];     
    }
    set vertical(newVertical: boolean) {
        this.setAttr("vertical", newVertical);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Slider;