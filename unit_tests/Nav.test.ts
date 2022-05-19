import { Control, Nav, NavItem } from "../src/index"

test('Nav add test', () => {
    let nav = new Nav({ items: [new NavItem({key: "folderList", icon: "FolderList", iconColor: "red", newWindow: true}), 
                        new NavItem({key: "pageList", icon: "PageList", iconColor: "blue", newWindow: false})],
                        id: "newNav"
                    });
    expect(nav instanceof Control).toBeTruthy();
    expect(nav.getControlName()).toBe("nav");
    expect(nav.getCmds()).toMatchObject([
        { indent: 0, values: ['nav'], attrs: {id: 'newNav'}, commands: [] },
        { indent: 2, values: ['item'], attrs: {key: 'folderList', icon: 'FolderList', iconColor: 'red', newWindow: 'true'}, commands: [] },
        { indent: 2, values: ['item'], attrs: {key: 'pageList', icon: 'PageList', iconColor: 'blue', newWindow: 'false'}, commands: [] }
    ]);
});
