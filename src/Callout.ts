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
    private _controls: Control[] = [];

    constructor(calloutProps: CalloutProperties) {
        super(calloutProps);
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
        return this.attrs.get('target')[0];     
    }
    set target(newTarget: string) {
        this.setAttr("target", newTarget);
    }
    get position() {
        return this.attrs.get('position')[0];     
    }
    set position(newPosition: string) {
        this.setAttr("position", newPosition);
    }
    get gap() {
        return this.attrs.get('gap')[0];     
    }
    set gap(newGap: number) {
        this.setAttr("gap", newGap);
    }
    get beak() {
        return this.attrs.get('beak')[0];     
    }
    set beak(newBeak: boolean) {
        this.setAttr("beak", newBeak);
    }
    get beakWidth() {
        return this.attrs.get('beakWidth')[0];     
    }
    set beakWidth(newBeakWidth: number) {
        this.setAttr("beakWidth", newBeakWidth);
    }
    get pagePadding() {
        return this.attrs.get('pagePadding')[0];     
    }
    set pagePadding(newPagePadding: number) {
        this.setAttr("pagePadding", newPagePadding);
    }
    get focus() {
        return this.attrs.get('focus')[0];     
    }
    set focus(newFocus: boolean) {
        this.setAttr("focus", newFocus);
    }
    get cover() {
        return this.attrs.get('cover')[0];     
    }
    set cover(newCover: boolean) {
        this.setAttr("cover", newCover);
    }
    get visible() {
        return this.attrs.get('visible')[0];     
    }
    set visible(newVisible: boolean) {
        this.setAttr("visible", newVisible);
    }
}

export = Callout;