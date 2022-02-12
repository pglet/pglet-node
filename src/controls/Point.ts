import { ControlProperties, Control } from '../Control'

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

class Point extends Control {
    _props: PointProperties
    constructor(pointProps: PointProperties) {
        super(pointProps);
        this._props = pointProps    
    }

    getControlName() {
        return "p";
    }

    /* accessors */ 
    get x() {
        return this.getAttr('x', typeof(this._props.x));     
    }
    set x(newX: number) {
        this.setAttr("x", newX);
    }
    get y() {
        return this.getAttr('y', typeof(this._props.y));     
    }
    set y(newY: number) {
        this.setAttr("y", newY);
    }
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get tick() {
        return this.getAttr('tick', typeof(this._props.tick));     
    }
    set tick(newTick: number) {
        this.setAttr("tick", newTick);
    }
    get legend() {
        return this.getAttr('legend', typeof(this._props.legend));     
    }
    set legend(newLegend: string) {
        this.setAttr("legend", newLegend);
    }
    get color() {
        return this.getAttr('color', typeof(this._props.color));     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get tooltip() {
        return this.getAttr('tooltip', typeof(this._props.tooltip));     
    }
    set tooltip(newTooltip: number) {
        this.setAttr("tooltip", newTooltip);
    }
    get xTooltip() {
        return this.getAttr('xTooltip', typeof(this._props.xTooltip));     
    }
    set xTooltip(newXTooltip: string) {
        this.setAttr("xTooltip", newXTooltip);
    }
    get yTooltip() {
        return this.getAttr('yTooltip', typeof(this._props.yTooltip));     
    }
    set yTooltip(newYTooltip: string) {
        this.setAttr("yTooltip", newYTooltip);
    }
}

export = Point;