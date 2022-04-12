import { Control, Toggle } from "../src/index";

test('Toggle add test', () => {
    let toggle = new Toggle({ label: "toggleLabel", onText: "on", offText: "off"});
    expect(toggle instanceof Control).toBeTruthy();
    expect(toggle.getControlName()).toBe("toggle");
    expect(toggle.getCmds()).toMatchObject([
        { indent: 0, values: ['toggle'], attrs: {label: 'toggleLabel', onText: 'on', offText: 'off'}, commands: [] }
    ]);
});