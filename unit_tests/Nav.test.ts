import { Nav, NavItem } from "../src/Nav"
import { Control } from "../src/index"

test('Nav add test', () => {
    let nav = new Nav({ items: [new NavItem({key: "folderList", icon: "FolderList", iconColor: "red", newWindow: true}), 
                        new NavItem({key: "pageList", icon: "PageList", iconColor: "blue", newWindow: false})],
                        id: "newNav"
                    });
    expect(nav instanceof Control).toBeTruthy();
    expect(nav.getControlName()).toMatchObject("nav");
    expect(nav.getCmds()).toMatchObject(
        `nav id="newNav"\n` +
        `  item key="folderList" icon="FolderList" iconColor="red" newWindow="true"\n` +
        `  item key="pageList" icon="PageList" iconColor="blue" newWindow="false"`
    );
});
