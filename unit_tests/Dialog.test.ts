import { Dialog, Button, Text, Control } from "../src/index"

test('dialog add test', () => {
    let d = new Dialog({ open: true, title: "dialog1", subText: "dialog subtext", autoDismiss: true, 
                            footer: [new Button({text: "OK"}), new Button({text: "CANCEL"})], 
                            childControls: [new Text({value: "Do you want this?"})]
                        })
    expect(d instanceof Control).toBeTruthy();
    expect(d instanceof Dialog).toBeTruthy();
    expect(d.getControlName()).toBe("dialog");
    expect(d.getCmdStr()).toBe(
        `dialog open="true" title="dialog1" subText="dialog subtext" autoDismiss="true"\n` +
        `  text value="Do you want this?"\n` +
        `  footer\n` +
        `    button text="OK"\n` +
        `    button text="CANCEL"` 
    );
});