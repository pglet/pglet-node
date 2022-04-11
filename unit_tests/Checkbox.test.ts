import { Control, Checkbox } from "../src/index"

test('Checkbox add test', () => {
    let cb = new Checkbox({ value: true, label: "check-box"});
    expect(cb instanceof Control).toBeTruthy();
    expect(cb instanceof Checkbox).toBeTruthy();
    expect(cb.getControlName()).toBe("checkbox");
    expect(cb.getCmds()).toMatchObject([
        { indent: 0, values: ['checkbox'], attrs: {value: 'true', label: 'check-box'}, commands: [] }
    ]);
});
