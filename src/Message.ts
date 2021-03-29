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
    buttons?: MessageButton[]
}

class MessageButton extends Control {

    constructor(messageButtonProps: MessageButtonProperties) {
        super(messageButtonProps);
    }

    getControlName() {
        return "button";
    }

    protected getChildren(): [] {
        return [];
    }

    /* accessors */ 
    get text() {
        return this.attrs.get('text')[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get action() {
        return this.attrs.get('action')[0];     
    }
    set action(newAction: string) {
        this.setAttr("action", newAction);
    }
}

class Message extends Control{
    private _buttons: MessageButton[] = [];

    constructor(messageProps: MessageProperties) {
        super(messageProps);
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
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get type() {
        return this.attrs.get('type')[0];     
    }
    set type(newType: string) {
        this.setAttr("type", newType);
    }
    get multiline() {
        return this.attrs.get('multiline')[0];     
    }
    set multiline(newMultiline: boolean) {
        this.setAttr("multiline", newMultiline);
    }
    get truncated() {
        return this.attrs.get('truncated')[0];     
    }
    set truncated(newTruncated: boolean) {
        this.setAttr("truncated", newTruncated);
    }
    get dismiss() {
        return this.attrs.get('dismiss')[0];     
    }
    set dismiss(newDismiss: boolean) {
        this.setAttr("dismiss", newDismiss);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.attrs.get('iconColor')[0];     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
    get dismissIcon() {
        return this.attrs.get('dismissIcon')[0];     
    }
    set dismissIcon(newDismissIcon: string) {
        this.setAttr("dismissIcon", newDismissIcon);
    }
    get dismissIconColor() {
        return this.attrs.get('dismissIconColor')[0];     
    }
    set dismissIconColor(newDismissIconColor: string) {
        this.setAttr("dismissIconColor", newDismissIconColor);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}



export {
    MessageButton, Message
}