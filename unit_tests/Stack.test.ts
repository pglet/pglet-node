import { Stack, Control, Button, Textbox } from "../src/index"

test('stack add test', () => {
    let stack = new Stack({childControls: [new Textbox({id: "textbox1", value: "value1"}), new Textbox({id: "textbox2", value: "value2"})]});
    expect(stack instanceof Control).toBeTruthy();
    expect(stack.getControlName()).toBe("stack");
    expect(stack.getCmdStr()).toBe(
        `stack\n` +
        `  textbox id="textbox1" value="value1"\n` +
        `  textbox id="textbox2" value="value2"`
    );
});

test('nested stack test', () => {
    let innerStack = new Stack({childControls: [new Button({id: "submit", text: "submit", primary: true})]});
    let outerStack = new Stack({childControls: [new Textbox({id: "textbox1", value: "value1"}), new Textbox({id: "textbox2", value: "value2"}), innerStack]})
    expect(innerStack instanceof Control).toBeTruthy();
    expect(outerStack instanceof Control).toBeTruthy();
    expect(outerStack.getCmdStr()).toBe(
        `stack\n` +
        `  textbox id="textbox1" value="value1"\n` +
        `  textbox id="textbox2" value="value2"\n` +
        `  stack\n` +
        `    button id="submit" text="submit" primary="true"`
    );
});

