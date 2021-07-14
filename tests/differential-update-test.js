const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("differential update", { noWindow: false });

    await p.clean();
    
    let textObject = new pglet.Text({id: "heading", value: "initial value"});
    let textboxObject = new pglet.Textbox({value: "Your age", description: "What is your age?", multiline: true});
    let checkBoxObject = new pglet.Checkbox({id: "c-box", value: true, label: "testCheckbox"});
    // let gridColumns = [new pglet.Column({name: "Name", fieldName: "name", sortable: "true"}), new pglet.Column({name: "Age", fieldName: "age", sortable: "true"})];
    // let items = [new pglet.Item({name: "Art Farmer", age: 58}), new pglet.Item({name: "Jim Hall", age: 56}), new pglet.Item({name: "Steve Gadd", age: 42})]
    // let gridObject = new pglet.Grid({columns: gridColumns, items: items});

    let stackObject = new pglet.Stack({childControls: [textObject, textboxObject, checkBoxObject]});

    
    const id = await p.add(stackObject);
    console.log("id: ", id);
    
    let textObject2 = new pglet.Text({value: "New text"});
    textObject.value = "updated value";
    textboxObject.value = "Your shoe size";
    textboxObject.description = "What is your shoe size?";
    
    let newEvent = new pglet.Event('page', 'change', '[{"i":"c-box","value":"false"}]');
    p._onEvent(newEvent);
    newEvent._data = '[{"i":"c-box","value":"true"}]';
    p._onEvent(newEvent);

    console.log("checkBoxObject value: ", checkBoxObject.value);
    checkBoxObject.value = false;
    console.log("checkBoxObject value: ", checkBoxObject.value);
    stackObject.childControls.push(textObject2);
    //console.log("stack child controls: ", stackObject.childControls);
  
    await sleep(3000);
    
    p.update();
   
    // await sleep(1000);
    // p.clean();

    
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 

