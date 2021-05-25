import { ControlProperties, Control } from './Control'

interface CalloutProperties extends ControlProperties {
    target?: string,
    postion?: string,
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
    get postion() {
        return this.attrs.get('postion')[0];     
    }
    set postion(newPostion: string) {
        this.setAttr("postion", newPostion);
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
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Callout;