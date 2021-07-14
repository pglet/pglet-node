import { Tab, Tabs } from "../src/Tabs";
import { Control } from "../src/index";

test('Tabs add test', () => {
    let tab1 = new Tab({text: "tab1"});
    let tab2 = new Tab({text: "tab2"});
    let tabList = [tab1, tab2];
    let tabs = new Tabs({ tabs: tabList});
    expect(tab1 instanceof Control).toBeTruthy();
    expect(tabs instanceof Control).toBeTruthy();
    expect(tabs.getControlName()).toBe("tabs");
    console.log(tabs.getCmdStr());
    expect(tabs.getCmdStr()).toBe(
        `tabs\n` + 
        `  tab text="tab1"\n` +
        `  tab text="tab2"` 
    );
});

