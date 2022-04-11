import { Dialog, Button, Text, Control } from "../src/index"

test('dialog add test', () => {
    let d = new Dialog({ open: true, title: "dialog1", subText: "dialog subtext", autoDismiss: true, 
                            footer: [new Button({text: "OK"}), new Button({text: "CANCEL"})], 
                            childControls: [new Text({value: "Do you want this?"})]
                        })
    expect(d instanceof Control).toBeTruthy();
    expect(d instanceof Dialog).toBeTruthy();
    expect(d.getControlName()).toBe("dialog");
    expect(d.getCmds()).toMatchObject([
        { indent: 0, values: ['dialog'], attrs: {open: 'true', title: 'dialog1', subText: 'dialog subtext', autoDismiss: 'true'}, commands: [] },
        { indent: 2, values: ['text'], attrs: {value: 'Do you want this?'}, commands: [] },
        { indent: 2, values: ['footer'], attrs: {}, commands: [] },
        { indent: 4, values: ['button'], attrs: {text: 'OK'}, commands: [] },
        { indent: 4, values: ['button'], attrs: {text: 'CANCEL'}, commands: [] }
    ]);
});

 