import { ControlProperties, Control } from './Control'

interface PointProperties extends ControlProperties {
    x?: number,
    y?: number,
    value?: number,
    tick?: number,
    legend?: string,
    color?: string,
    tooltip?: string,
    xTooltip?: string,
    yTooltip?: string,
}

class Point extends Control{
    constructor(pointProps: PointProperties) {
        super(pointProps);    
    }

    getControlName() {
        return "p";
    }

    /* accessors */ 
    get x() {
        return this.attrs.get('x')[0];     
    }
    set x(newX: number) {
        this.setAttr("x", newX);
    }
    get y() {
        return this.attrs.get('y')[0];     
    }
    set y(newY: number) {
        this.setAttr("y", newY);
    }
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get tick() {
        return this.attrs.get('tick')[0];     
    }
    set tick(newTick: number) {
        this.setAttr("tick", newTick);
    }
    get legend() {
        return this.attrs.get('legend')[0];     
    }
    set legend(newLegend: string) {
        this.setAttr("legend", newLegend);
    }
    get color() {
        return this.attrs.get('color')[0];     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get tooltip() {
        return this.attrs.get('tooltip')[0];     
    }
    set tooltip(newTooltip: number) {
        this.setAttr("tooltip", newTooltip);
    }
    get xTooltip() {
        return this.attrs.get('xTooltip')[0];     
    }
    set xTooltip(newXTooltip: string) {
        this.setAttr("xTooltip", newXTooltip);
    }
    get yTooltip() {
        return this.attrs.get('yTooltip')[0];     
    }
    set yTooltip(newYTooltip: string) {
        this.setAttr("yTooltip", newYTooltip);
    }
}

export = Point;