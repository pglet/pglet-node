const pglet = require("../src/index.ts");
import { Control, Button } from "../src/index"

test('button test', () => {
    let b = new Button({text: "myButton", primary: true});
    expect(b instanceof Control).toBeTruthy();
    expect(b.getControlName()).toBe("button");
    expect(b.getCmdStr()).toBe(
        `button text="myButton" primary="true"`
    );
});