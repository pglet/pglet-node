const pglet = require("../build/index.js");

let nextTaskId = 0;
let taskIds = [];
let tasksCompleted = [];
let taskNames = [];

async function updateTasksView() {
} 
async function addNewTask() {
    let task = p.getValue("new_task");
    if (!task) {
        return;
    }
    p.send("set new_task value=''");
    taskIds.push(nextTaskId);
    tasksCompleted.push(false);
    taskNames.push(task);
    nextTaskId = nextTaskId++;
    updateTasksView();
    
} 
(async () => {
    let p = await pglet.page("TodoApp", { noWindow: false });
    // p.update("index", { title: "Node TODO with pglet", horizontalAlign: "center"})
    await p.add(new pglet.Stack({width: "70%", 
            childControls: [
                new pglet.Text({value: "Todos", size: "xLarge", align: "center"}),
                new pglet.Stack({horizontal: true,
                    childControls: [
                        new pglet.Textbox({id: "new_task", placeholder: "What needs to be done?", width: "100%"}),
                        new pglet.Button({primary: true, id: "add", text: "add"})
                    ]}),
                new pglet.Stack({gap: "25", 
                    childControls: [
                        new pglet.Tabs({id: "view", 
                            childControls: [
                                new pglet.Tab({text: "all"}),
                                new pglet.Tab({key: "false", text: "active"}),
                                new pglet.Tab({key: "true", text: "completed"})
                            ]}),
                        new pglet.Stack({id: "tasks"}),
                        new pglet.Stack({horizontal: true, horizontalAlign: "space-between", verticalAlign: "center",
                            childControls: [
                                new pglet.Text({id: "items_left", value: "0 items left"}),
                                new pglet.Button({id: "clear_completed", text: "Clear Completed"})
                            ]})
                    ]})
            ]})
        );

    // addNewTask


    // p.add()
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);
    }
})(); 