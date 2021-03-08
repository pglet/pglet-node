const pglet = require("../src/index.ts");

test('stack add test', () => {
    let stack = new pglet.Stack({childControls: [new pglet.Textbox({id: "textbox1", value: "value1"}), new pglet.Textbox({id: "textbox2", value: "value2"})]});
    expect(stack instanceof pglet.Control).toBeTruthy();
    expect(stack.getCmdStr()).toBe(
        `stack\n` +
        `  textbox id="textbox1" value="value1"\n` +
        `  textbox id="textbox2" value="value2"`
    )
});

test('nested stack test', () => {
    let innerStack = new pglet.Stack({childControls: [new pglet.Button({id: "submit", text: "submit", primary: true})]});
    let outerStack = new pglet.Stack({childControls: [new pglet.Textbox({id: "textbox1", value: "value1"}), new pglet.Textbox({id: "textbox2", value: "value2"}), innerStack]})
    expect(innerStack instanceof pglet.Control).toBeTruthy();
    expect(outerStack instanceof pglet.Control).toBeTruthy();
    expect(outerStack.getCmdStr()).toBe(
        `stack\n` +
        `  textbox id="textbox1" value="value1"\n` +
        `  textbox id="textbox2" value="value2"\n` +
        `  stack\n` +
        `    button id="submit" text="submit" primary="true"`
    )
});

