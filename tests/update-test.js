const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("update-test", { noWindow: false });

    await p.clean()
    
    let tablist = [new pglet.Tab({text: "tab1", icon: "Sunny"}), new pglet.Tab({text: "tab2", icon: "Cloudy"})]
    await p.add(new pglet.Tabs({tabs: tablist}));
    let textObject = new pglet.Text({id: "heading", value: "greeter app test"});
    let textboxObject = new pglet.Textbox({value: "Your Name", description: "Please provide your name", multiline: true});
    let ddObject = new pglet.Dropdown({label: "dropdown", optionKeys: ["small", "medium", "large"]});
    let checkBoxObject = new pglet.Checkbox({value: true, label: "testCheckbox"});

    let stackObject = new pglet.Stack({childControls: [textObject, textboxObject, ddObject, checkBoxObject]});
    // console.log("call getCmdStr: ", stackObject.getCmdStr());
    const id = await p.add(stackObject);


    
    
    console.log(id);
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        // await p.send("clean")
        stackObject.horizontal = true;
        stackObject.childControls = [textObject, ddObject];
        await p.update();

        buttonObject.text = name
        buttonObject.onClick = greeterButtonHandler2;
        await p.update();
        await p.add(new pglet.Text({value: `Hello ${name}!`}))
        return
    }
    async function greeterButtonHandler2(e) {
        await p.clean();
        return
    }

    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add(buttonObject);
    let gridColumns = [new pglet.Column({name: "Name", fieldName: "name", sortable: "true"}), new pglet.Column({name: "Age", fieldName: "age", sortable: "true"})];
    let items = [{name: "Art Farmer", age: 58}, {name: "Jim Hall", age: 56}, {name: "Steve Gadd", age: 42}]
    let gridObject = new pglet.Grid({columns: gridColumns, items: items});
    await p.add(gridObject);
    
    while(true) {
        const e = await p.waitEvent();
        let control = p.getControl(e.target);
        console.log("control from event loop: ", control);
        console.log(e);

    }
})(); 
