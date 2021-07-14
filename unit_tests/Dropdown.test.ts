import { Dropdown, Control } from "../src/index"

test('dropdown add test', () => {
    let dd = new Dropdown({label: "myDropdown", optionValues: ["small", "medium", "large"], optionKeys: ["s", "m", "l"]});
    expect(dd instanceof Control).toBeTruthy();
    expect(dd instanceof Dropdown).toBeTruthy();
    expect(dd.getControlName()).toBe("dropdown");
    expect(dd.getCmdStr()).toBe(
        `dropdown label="myDropdown"\n` +
        `  option key="s" text="small"\n` +
        `  option key="m" text="medium"\n` +
        `  option key="l" text="large"` 
    );
});