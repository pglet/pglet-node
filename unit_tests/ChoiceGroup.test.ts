import { ChoiceGroup, Option, Control } from "../src/index"

test('choicegroup add test', () => {
    let cg = new ChoiceGroup({label: "Choice Group", value: "cg1", options: [
                                new Option({key: "key1", text: "value1", icon: "Arrivals"}), new Option({key: "key2", text: "value2", icon: "Asterisk"})
                            ]});
    expect(cg instanceof Control).toBeTruthy();
    expect(cg instanceof ChoiceGroup).toBeTruthy();
    expect(cg.getControlName()).toBe("choicegroup");
    expect(cg.getCmds()).toMatchObject([
        { indent: 0, values: ['choicegroup'], attrs: {label: 'Choice Group', value: 'cg1'}, commands: [] },
        { indent: 2, values: ['option'], attrs: {key: 'key1', text: 'value1', icon: 'Arrivals'}, commands: [] },
        { indent: 2, values: ['option'], attrs: {key: 'key2', text: 'value2', icon: 'Asterisk'}, commands: [] }
    ]);
});
