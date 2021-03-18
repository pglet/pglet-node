import { Nav, Item } from "../src/Nav"
import { Control } from "../src/index"

test('Nav add test', () => {
    let nav = new Nav({ items: [new Item({key: "folderList", icon: "FolderList", iconColor: "red", newWindow: true}), 
                        new Item({key: "pageList", icon: "PageList", iconColor: "blue", newWindow: false})],
                        id: "newNav"
                    });
    expect(nav instanceof Control).toBeTruthy();
    expect(nav.getControlName()).toBe("nav");
    expect(nav.getCmdStr()).toBe(
        `nav id="newNav"\n` +
        `  item key="folderList" icon="FolderList" iconColor="red" newWindow="true"\n` +
        `  item key="pageList" icon="PageList" iconColor="blue" newWindow="false"`
    );
});
