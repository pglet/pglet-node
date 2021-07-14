const pglet = require('../dist/index.js');

const Text = pglet.Text;
const Stack = pglet.Stack;
const Searchbox = pglet.Searchbox;
const Textbox = pglet.Textbox;
const Button = pglet.Button;
const Checkbox = pglet.Checkbox;
const Icon = pglet.Icon;

async function main(page) {
    page.title = "Stress test";
    page.horizontalAlign = 'center';
    await page.update();
    let items = new Stack({id: "icons", horizontal: true, wrap: true})
    let stack = new Stack({id: "container", childControls: [
                            new Searchbox({}),
                            items
                        ]})
    for (const e of [...Array(1000).keys()]) {
        let s = new Stack({horizontalAlign: "center", verticalAlign: "center", width: 100, height: 100, childControls: [
                            new Icon({name: "Favicon", size: "40", color: "#555"}),
                            new Text({value: `C${e}`, size: "small"})
                        ]})
        
        items.childControls.push(s);
                        
    }
    let checkBox = new Checkbox({label: "Attribute type check"});
    function onSearchHandler() {
        console.log("checkbox value: ", checkBox.value);
    }
    await page.add([items, checkBox, new Searchbox({onSearch: onSearchHandler, triggerOnChange: true})]);
}

pglet.app("Performance", main);