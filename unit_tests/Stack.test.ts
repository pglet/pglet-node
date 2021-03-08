const pglet = require("../src/index.ts");

test('stack test', () => {
    let stack = new pglet.Stack({childControls: [new pglet.Textbox({id: "textbox1", value: "value1"}), new pglet.Textbox({id: "textbox2", value: "value2"})]});
    expect(stack instanceof pglet.Control).toBeTruthy();
    expect(stack.getCmdStr()).toBe(
        `stack\n` +
        `  textbox id="textbox1" value="value1"\n` +
        `  textbox id="textbox2" value="value2"`
    )
});

