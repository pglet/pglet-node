import { Stack, Control, Button, Textbox } from "../src/index"

test('stack add test', () => {
    let stack = new Stack({childControls: [new Textbox({id: "textbox1", value: "value1"}), new Textbox({id: "textbox2", value: "value2"})]});
    expect(stack instanceof Control).toBeTruthy();
    expect(stack.getControlName()).toBe("stack");
    expect(stack.getCmds()).toMatchObject([
        { indent: 0, values: ['stack'], attrs: {}, commands: [] },
        { indent: 2, values: ['textbox'], attrs: {id: 'textbox1', value: 'value1'}, commands: [] },
        { indent: 2, values: ['textbox'], attrs: {id: 'textbox2', value: 'value2'}, commands: [] }
    ]);
});


test('nested stack test', () => {
    let innerStack = new Stack({childControls: [new Button({id: "submit", text: "submit", primary: true})]});
    let outerStack = new Stack({childControls: [new Textbox({id: "textbox1", value: "value1"}), new Textbox({id: "textbox2", value: "value2"}), innerStack]})
    expect(innerStack instanceof Control).toBeTruthy();
    expect(outerStack instanceof Control).toBeTruthy();
    expect(outerStack.getCmds()).toMatchObject([
        { indent: 0, values: ['stack'], attrs: {}, commands: [] },
        { indent: 2, values: ['textbox'], attrs: {id: 'textbox1', value: 'value1'}, commands: [] },
        { indent: 2, values: ['textbox'], attrs: {id: 'textbox2', value: 'value2'}, commands: [] },
        { indent: 2, values: ['stack'], attrs: {}, commands: [] },
        { indent: 4, values: ['button'], attrs: {id: 'submit', text: 'submit', primary: 'true'}, commands: [] }
    ]);
});
