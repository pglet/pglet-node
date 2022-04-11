import Toggle from "../src/Toggle";
import { Control } from "../src/index";

test('Toggle add test', () => {
    let toggle = new Toggle({ label: "toggleLabel", onText: "on", offText: "off"});
    expect(toggle instanceof Control).toBeTruthy();
    expect(toggle.getControlName()).toMatchObject("toggle");
    expect(toggle.getCmds()).toMatchObject(
        `toggle label="toggleLabel" onText="on" offText="off"` 
    );
});