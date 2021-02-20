
export interface ControlProperties {
    id?: string,
    visible?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    margin?: string
}

export class Control {
    public id: string | null;
    public visible: boolean | null;
    public disabled: boolean | null;
    public width: string | null;
    public height: string | null;
    public padding: string | null;
    public margin: string | null;

    constructor(controlProps: ControlProperties) {
        this.id = controlProps.id ? controlProps.id : null;
        this.visible = controlProps.visible ? controlProps.visible : null;
        this.disabled = controlProps.disabled ? controlProps.disabled : null;
        this.width = controlProps.width ? controlProps.width : null;
        this.height = controlProps.height ? controlProps.height : null;
        this.padding = controlProps.padding ? controlProps.padding : null;
        this.margin = controlProps.margin ? controlProps.margin : null;
    }
    
    getCmdStr(update?: boolean, index?: number, conn?: string): string {
        return "TODO";

    }



}