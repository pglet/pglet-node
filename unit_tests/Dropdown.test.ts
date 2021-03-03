const dropdown = require("../src/Dropdown.ts");

test('dropdown test', () => {
    let dd = new dropdown({label: "myDropdown", optionValues: ["small", "big", "medium"]});
    expect(dd.getControlName()).toBe("dropdown");
});