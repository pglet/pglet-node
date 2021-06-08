
const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(p) {
    await p.clean();
    p.title = "Update testing";
    p.horizontalAlign = "start";
    await p.update();




    let sidebarHeading = new pglet.Text({id: "heading", value: "Add and change Stuff!"});
    let newGridName = new pglet.Textbox({description: "Create a new card title"});
    let gridSizeDD = new pglet.Dropdown({label: "Choose new card size", optionKeys: ["small", "medium", "large"]});
    let addButton = new pglet.Button({text: "Add your card!", primary: true, onClick: addButtonHandler})
    let sidebar = new pglet.Stack({width: '20%',  childControls: [sidebarHeading, newGridName, gridSizeDD, addButton]});
    let content = new pglet.Stack({width: '75%'})
    let pageStack = new pglet.Stack({width: '100%', horizontal: true, childControls: [sidebar, content]});
    const id = await p.add(pageStack);
    console.log(id);

    async function addButtonHandler(e) {
        let name = await p.getValue(newGridName);
        let newCard;
        if (gridSizeDD.value == "small") {
            newCard = new pglet.Stack({width: "70px", height: "50px", border: "1px solid #000", bgcolor: "blue"})
        }
        else if (gridSizeDD.value == "medium") {
            newCard = new pglet.Stack({width: "140px", height: "100px", border: "2px solid #000", bgcolor: "blue"})
        }
        else {
            newCard = new pglet.Stack({width: "280px", height: "200px", border: "4px solid #000", bgcolor: "blue"})
        }
        newCard.childControls.push(new pglet.Text({value: newGridName.value, verticalAlign: "bottom", bold: true, color: "yellow", align: "center"}));
        content.childControls.push(newCard);
        await p.update();
        return
    }

    async function greeterButtonHandler2(e) {
        await p.clean();
        return
    }


    while(true) {
        const e = await p.waitEvent();
        console.log(e);
    
    }

}

pglet.app("update-app", {local: true}, main);




