import { ChoiceGroup, Option, Control } from "../src/index"

test('dropdown test', () => {
    let cg = new ChoiceGroup({label: "Choice Group", value: "cg1", options: [
                                new Option({key: "key1", text: "value1", icon: "Arrivals"}), new Option({key: "key2", text: "value2", icon: "Asterisk"})
                            ]});
    expect(cg instanceof Control).toBeTruthy();
    expect(cg instanceof ChoiceGroup).toBeTruthy();
    expect(cg.getControlName()).toBe("choicegroup");
    expect(cg.getCmdStr()).toBe(
        `choicegroup label="Choice Group" value="cg1"\n` +
        `  option key="key1" text="value1" icon="Arrivals"\n` +
        `  option key="key2" text="value2" icon="Asterisk"`
    );
});