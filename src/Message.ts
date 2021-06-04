import { ControlProperties, Control } from './Control'

interface MessageButtonProperties extends ControlProperties {
    text?: string,
    action?: string,
}

interface MessageProperties extends ControlProperties {
    value?: string,
    type?: string,
    multiline?: boolean,
    truncated?: boolean,
    dismiss?: boolean,
    icon?: string,
    iconColor?: string,
    dismissIcon?: string,
    dismissIconColor?: string,
    data?: string,
    onDismiss?: any,
    buttons: MessageButton[]
}

class MessageButton extends Control {
    _props: MessageButtonProperties
    constructor(messageButtonProps: MessageButtonProperties) {
        super(messageButtonProps);
        this._props = messageButtonProps
    }

    getControlName() {
        return "button";
    }

    /* accessors */ 
    get text() {
        return this.getAttr('text', typeof(this._props.text));     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get action() {
        return this.getAttr('action', typeof(this._props.action));     
    }
    set action(newAction: string) {
        this.setAttr("action", newAction);
    }
}

class Message extends Control {
    _props: MessageProperties
    private _buttons: MessageButton[] = [];

    constructor(messageProps: MessageProperties) {
        super(messageProps);
        this._props = messageProps
        if (messageProps.onDismiss) {
            super.addEventHandler("dismiss", messageProps.onDismiss);
        }
        this._buttons.push(...messageProps.buttons)
    }

    getControlName() {
        return "message";
    }

    protected getChildren(): Control[] {
        return this._buttons;
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get type() {
        return this.getAttr('type', typeof(this._props.type));     
    }
    set type(newType: string) {
        this.setAttr("type", newType);
    }
    get multiline() {
        return this.getAttr('multiline', typeof(this._props.multiline));     
    }
    set multiline(newMultiline: boolean) {
        this.setAttr("multiline", newMultiline);
    }
    get truncated() {
        return this.getAttr('truncated', typeof(this._props.truncated));     
    }
    set truncated(newTruncated: boolean) {
        this.setAttr("truncated", newTruncated);
    }
    get dismiss() {
        return this.getAttr('dismiss', typeof(this._props.dismiss));     
    }
    set dismiss(newDismiss: boolean) {
        this.setAttr("dismiss", newDismiss);
    }
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.getAttr('iconColor', typeof(this._props.iconColor));     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
    get dismissIcon() {
        return this.getAttr('dismissIcon', typeof(this._props.dismissIcon));     
    }
    set dismissIcon(newDismissIcon: string) {
        this.setAttr("dismissIcon", newDismissIcon);
    }
    get dismissIconColor() {
        return this.getAttr('dismissIconColor', typeof(this._props.dismissIconColor));     
    }
    set dismissIconColor(newDismissIconColor: string) {
        this.setAttr("dismissIconColor", newDismissIconColor);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}



export {
    MessageButton, Message
}