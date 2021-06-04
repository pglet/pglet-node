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
    _props: SliderProperties
    constructor(sliderProps: SliderProperties) {
        super(sliderProps);
        this._props = sliderProps
        if (sliderProps.onChange) {
            super.addEventHandler("change", sliderProps.onChange);
        }
    }

    getControlName() {
        return "slider";
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
    get min() {
        return this.getAttr('min', typeof(this._props.min));     
    }
    set min(newMin: number) {
        this.setAttr("min", newMin);
    }
    get max() {
        return this.getAttr('min', typeof(this._props.min));     
    }
    set max(newMax: number) {
        this.setAttr("max", newMax);
    }
    get step() {
        return this.getAttr('step', typeof(this._props.step));     
    }
    set step(newStep: number) {
        this.setAttr("step", newStep);
    }
    get showValue() {
        return this.getAttr('showValue', typeof(this._props.showValue));     
    }
    set showValue(newShowValue: boolean) {
        this.setAttr("showValue", newShowValue);
    }
    get valueFormat() {
        return this.getAttr('valueFormat', typeof(this._props.valueFormat));     
    }
    set valueFormat(newValueFormat: string) {
        this.setAttr("valueFormat", newValueFormat);
    }
    get vertical() {
        return this.getAttr('vertical', typeof(this._props.vertical));     
    }
    set vertical(newVertical: boolean) {
        this.setAttr("vertical", newVertical);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Slider;