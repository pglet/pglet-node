import { Control, Tab, Tabs } from "../src/index";

test('Tabs add test', () => {
    let tab1 = new Tab({text: "tab1"});
    let tab2 = new Tab({text: "tab2"});
    let tabList = [tab1, tab2];
    let tabs = new Tabs({ tabs: tabList});
    expect(tab1 instanceof Control).toBeTruthy();
    expect(tabs instanceof Control).toBeTruthy();
    expect(tabs.getControlName()).toBe("tabs");
    expect(tabs.getCmds()).toMatchObject([
        { indent: 0, values: ['tabs'], attrs: {}, commands: [] },
        { indent: 2, values: ['tab'], attrs: {text: 'tab1'}, commands: [] },
        { indent: 2, values: ['tab'], attrs: {text: 'tab2'}, commands: [] }
    ]);
});
