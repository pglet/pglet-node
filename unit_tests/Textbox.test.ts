import { Textbox, Control } from "../src/index"

test('textbox add test', () => {
    let tbox = new Textbox({ label: "textbox input", multiline: true, align: "right", borderless: true })
    expect(tbox instanceof Control).toBeTruthy();
    expect(tbox instanceof Textbox).toBeTruthy();
    expect(tbox.getControlName()).toBe("textbox");
    expect(tbox.getCmds()).toMatchObject([
        { indent: 0, values: ['textbox'], attrs: {label: 'textbox input', multiline: 'true', align: 'right', borderless: 'true'}, commands: [] }
    ]);
});