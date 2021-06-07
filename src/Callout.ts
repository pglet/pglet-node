import { ControlProperties, Control } from './Control'

interface CalloutProperties extends ControlProperties {
    target?: string,
    position?: string,
    gap?: number,
    beak?: boolean,
    beakWidth?: number,
    pagePadding?: number,
    focus?: boolean,
    cover?: boolean,
    visible?: boolean,
    childControls?: Control[],
    onDismiss?: any
}

class Callout extends Control {
    _props: CalloutProperties
    private _controls: Control[] = [];

    constructor(calloutProps: CalloutProperties) {
        super(calloutProps);
        this._props = calloutProps
        if (calloutProps.onDismiss) {
            super.addEventHandler("dismiss", calloutProps.onDismiss);
        }
        if (calloutProps.childControls) {
            
            this._controls.push(...calloutProps.childControls);
            console.log("calloutprops childControls: ", this._controls);
        }
    }

    getControlName() {
        return "callout";
    }
    protected getChildren(): Control[] {
        return this._controls;
    }

    /* accessors */ 
    get controls() {
        return this._controls;  
    }
    set controls(newControls: Control[]) {
        this._controls = newControls 
    }
    get target() {
        return this.getAttr('target', typeof(this._props.target));     
    }
    set target(newTarget: string) {
        this.setAttr("target", newTarget);
    }
    get position() {
        return this.getAttr('position', typeof(this._props.position));     
    }
    set position(newPosition: string) {
        this.setAttr("position", newPosition);
    }
    get gap() {
        return this.getAttr('gap', typeof(this._props.gap));     
    }
    set gap(newGap: number) {
        this.setAttr("gap", newGap);
    }
    get beak() {
        return this.getAttr('beak', typeof(this._props.beak));     
    }
    set beak(newBeak: boolean) {
        this.setAttr("beak", newBeak);
    }
    get beakWidth() {
        return this.getAttr('beakWidth', typeof(this._props.beakWidth));     
    }
    set beakWidth(newBeakWidth: number) {
        this.setAttr("beakWidth", newBeakWidth);
    }
    get pagePadding() {
        return this.getAttr('pagePadding', typeof(this._props.pagePadding));     
    }
    set pagePadding(newPagePadding: number) {
        this.setAttr("pagePadding", newPagePadding);
    }
    get focus() {
        return this.getAttr('focus', typeof(this._props.focus));     
    }
    set focus(newFocus: boolean) {
        this.setAttr("focus", newFocus);
    }
    get cover() {
        return this.getAttr('cover', typeof(this._props.cover));     
    }
    set cover(newCover: boolean) {
        this.setAttr("cover", newCover);
    }
    get visible() {
        return this.getAttr('visible', typeof(this._props.visible));     
    }
    set visible(newVisible: boolean) {
        this.setAttr("visible", newVisible);
    }
    get onDismiss() {
        return this.getEventHandler("dismiss");     
    }
    set onDismiss(newOnDismiss: any) {
        this.addEventHandler("dismiss", newOnDismiss);
    }
}

export = Callout;