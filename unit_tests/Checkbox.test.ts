import Checkbox from "../src/Checkbox"
import { Control } from "../src/index"

test('Checkbox add test', () => {
    let cb = new Checkbox({ value: true, label: "check-box"});
    expect(cb instanceof Control).toBeTruthy();
    expect(cb instanceof Checkbox).toBeTruthy();
    expect(cb.getControlName()).toBe("checkbox");
    expect(cb.getCmdStr()).toBe(
        `checkbox value="true" label="check-box"` 
    );
});
