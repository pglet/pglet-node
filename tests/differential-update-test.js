const pglet = require("../build/index.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });

    //await p.send("clean");
    
    let textObject = new pglet.Text({id: "heading", value: "initial value"});
    let textboxObject = new pglet.Textbox({value: "Your age", description: "What is your age?"});
    let checkBoxObject = new pglet.Checkbox({value: true, label: "testCheckbox"});
    // let gridColumns = [new pglet.Column({name: "Name", fieldName: "name", sortable: "true"}), new pglet.Column({name: "Age", fieldName: "age", sortable: "true"})];
    // let items = [new pglet.Item({name: "Art Farmer", age: 58}), new pglet.Item({name: "Jim Hall", age: 56}), new pglet.Item({name: "Steve Gadd", age: 42})]
    // let gridObject = new pglet.Grid({columns: gridColumns, items: items});

    let stackObject = new pglet.Stack({childControls: [textObject, textboxObject, checkBoxObject]});

    const id = await p.add([stackObject]);
    console.log(id);

    textObject.value = "updated value";
    textboxObject.value = "Your shoe size";
    textboxObject.description = "What is your shoe size?";
    checkBoxObject.value = false;

    //p.update([textObject, textboxObject, checkBoxObject]);

    
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 

