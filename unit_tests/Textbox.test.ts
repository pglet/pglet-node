import { Textbox, Control } from "../src/index"

test('textbox add test', () => {
    let tbox = new Textbox({ label: "textbox input", multiline: true, align: "right", borderless: true })
    expect(tbox instanceof Control).toBeTruthy();
    expect(tbox instanceof Textbox).toBeTruthy();
    expect(tbox.getControlName()).toBe("textbox");
    expect(tbox.getCmdStr()).toBe(
        `textbox label="textbox input" multiline="true" align="right" borderless="true"`);
});