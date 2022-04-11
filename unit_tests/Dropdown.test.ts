import { Dropdown, Control } from "../src/index"

test('dropdown add test', () => {
    let dd = new Dropdown({label: "myDropdown", optionValues: ["small", "medium", "large"], optionKeys: ["s", "m", "l"]});
    expect(dd instanceof Control).toBeTruthy();
    expect(dd instanceof Dropdown).toBeTruthy();
    expect(dd.getControlName()).toBe("dropdown");
    expect(dd.getCmds()).toMatchObject([
        { indent: 0, values: ['dropdown'], attrs: {label: 'myDropdown'}, commands: [] },
        { indent: 2, values: ['option'], attrs: {key: 's', text: 'small'}, commands: [] },
        { indent: 2, values: ['option'], attrs: {key: 'm', text: 'medium'}, commands: [] },
        { indent: 2, values: ['option'], attrs: {key: 'l', text: 'large'}, commands: [] }
    ]);
});
