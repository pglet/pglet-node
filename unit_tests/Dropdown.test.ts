import { Dropdown, Control } from "../src/index"

test('dropdown test', () => {
    let dd = new Dropdown({label: "myDropdown", optionValues: ["small", "big", "medium"]});
    expect(dd instanceof Control).toBeTruthy();
    expect(dd instanceof Dropdown).toBeTruthy();
    expect(dd.getControlName()).toBe("dropdown");
});