import { Text, Control } from "../src/index"

test('text add test', () => {
    let t = new Text({ value: "some text", markdown: true, bold: true, nowrap: true, border: "3px dotted #00FFFF", borderWidth: "3"})
    expect(t instanceof Control).toBeTruthy();
    expect(t instanceof Text).toBeTruthy();
    expect(t.getControlName()).toBe("text");
    expect(t.getCmds()).toMatchObject([
        { indent: 0, values: ['text'], attrs: {value: 'some text', markdown: 'true', bold: 'true', nowrap: 'true', border: '3px dotted #00FFFF', borderWidth: '3'}, commands: [] }
    ]);
});
