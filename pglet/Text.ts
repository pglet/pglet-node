import { ControlProperties, Control } from './Control'


interface TextProperties extends ControlProperties {
    value: string,
    align?: string,
    size?: string,   
}

export class Text extends Control {
    public value: string;
    public align: string | null;
    public size: string | null;

    constructor(textProps: TextProperties) {
        super(textProps);
        this.value = textProps.value;
        this.align = textProps.align ? textProps.align : null;
        this.size = textProps.size ? textProps.size : null;

    }
}