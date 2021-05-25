const pglet = require("../build/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.clean();
    
    // let progressObject = new pglet.Progress({label: "testProgress", width: "100%"})
    // await p.add(progressObject);
    // let tablist = [new pglet.Tab({text: "tab1", icon: "Sunny"}), new pglet.Tab({text: "tab2", icon: "Cloudy"})]
    // await p.add(new pglet.Tabs({tabs: tablist}));
    // let textObject = new pglet.Text({id: "heading", value: "greeter app test"});
    //let textboxObject = new pglet.Textbox({value: "Your Name", description: "Please provide your name"});
    let toolbarObject = new pglet.Toolbar({
                            items: [new pglet.ToolbarItem({text: "tool1", icon: "Add"}), new pglet.ToolbarItem({text: "tool2", icon: "Brush"})],
                            overflow: [new pglet.ToolbarItem({text: "overflowTool", icon: "Color"})],
                            far: [new pglet.ToolbarItem({text: "farTool", icon: "Cut", iconOnly: true})]
                        });
    await p.add([toolbarObject]);
    let messageObject = new pglet.Message({
                            value: "message1", dismiss: true, 
                            buttons: [new pglet.MessageButton({text: "yup", action: "yes"}), new pglet.MessageButton({text: "nope", action: "no"})]    
                        })
    await p.add([messageObject]);
    let textboxObject = new pglet.Textbox({id: "textbox1", value: "val1"});
    await p.add([textboxObject]);
    let choiceGroupObject = new pglet.ChoiceGroup({
                                value: "choiceGroup1", label: "choice group",
                                options: [new pglet.Option({ key: "key1", text: "value1"}), new pglet.Option({ key: "key2", text: "value2"})]  
                            });
    await p.add([choiceGroupObject]);
    let dialogObject = new pglet.Dialog({
        open: true, title: "dialog1", subText: "subtext1", autoDismiss: true,
        footer: [new pglet.Button({text: "OK"}), new pglet.Button({text: "CANCEL"})]
    });
    //await p.add([dialogObject]);
    let panelObject = new pglet.Panel({
                        open: true, title: "panel1", type: "small", autoDismiss: true,
                        footer: [new pglet.Button({text: "OK"}), new pglet.Button({text: "CANCEL"})]
                    });
    //await p.add([panelObject]);
    let datePickerObject = new pglet.DatePicker({label: "choose a date", value: "2021, 05, 19"});
    await p.add([datePickerObject]);
    let barchartObject = new pglet.Barchart({points: [
                            new pglet.Point({legend: 'A', x: 10, y: 100}),
                            new pglet.Point({legend: 'B', x: 20, y: 100})
                        ], dataMode: "fraction"})
    await p.add([barchartObject]);
    let verticalBarchartObject = new pglet.VerticalBarchart({yFormat:'{y}%', yTicks: 5, yMin: 0, yMax: 100, width: "100%", barWidth: 10, height: 400})
    let range = [...Array(100).keys()]
    range.forEach(element => {
        if (element < 70) {
            return;
        }
        verticalBarchartObject.points.push(new pglet.Point({x: element, y: Math.floor(Math.random() * 100)}))
    });

    await p.add([verticalBarchartObject]);
    
    let lineChartObject = new pglet.Linechart({legend: true, tooltips: true, yTicks: 4, yMin: 10, yMax: 10, xType: 'date', width: "500px", height: "400px", yFormat: "{y} °C", lines: [
                        new pglet.LineData({legend: "t,  °C", color: "green"})
                    ]})
    await p.add([lineChartObject]);
    let startDate = new Date(2021, 4, 1, 10, 5);
    let m = 0;
    for (const e of [...Array(60).keys()]) {
        console.log("e: ", e);
        let d = new Date(startDate.getTime() + (m*60000));
        let v = Math.floor((Math.random() - 0.5) *  40);
        lineChartObject.lines[0].points.push(new pglet.Point({x: d, y: v}));
        m += 1
    }
    
    let lineChartObject2 = new pglet.Linechart({legend: true, tooltips: true, strokeWidth: 5, yMin: 1, yMax: 10, xType: 'number', width: "500", lines: [
                                new pglet.LineData({legend: "line 1", points: [
                                    new pglet.Point({x: 0, y: 0}),
                                    new pglet.Point({x: 1, y: 10}),
                                    new pglet.Point({x: 2, y: 20}),
                                    new pglet.Point({x: 3, y: 50}),
                                    new pglet.Point({x: 4, y: 100}),
                                    new pglet.Point({x: 5, y: 90}),
                                    new pglet.Point({x: 6, y: 50}),
                                    new pglet.Point({x: 7, y: 30}),
                                    new pglet.Point({x: 8, y: 20}),
                                    new pglet.Point({x: 9, y: 5})
                                ]})
                            ]})
    await p.add([lineChartObject2]);

    let pieChartObject = new pglet.Piechart({tooltips: true, width: "50%", innerRadius: 40, innerValue: 35, points: [
                            new pglet.Point({color: "red", value: 35}),
                            new pglet.Point({color: "blue", value: 65})
                        ]})
    await p.add([pieChartObject]);

    let calloutButtonObject = new pglet.Button({text: "Callout button", primary: false, id: "button_callout"})
    await p.add([calloutButtonObject]);
    let calloutObject = new pglet.Callout({target: "button_callout", position: "bottomAuto", focus: true, beak: true, beakWidth: 20, visible: true, childControls: [
                            new pglet.Text({value: "big time callout!"})
                        ]})
   
    await p.add([calloutObject]);
    let smallSpinnerObject = new pglet.Spinner({label: "Small spinner", size: 'small', labelPosition: 'left'});
    let largeSpinnerObject = new pglet.Spinner({label: "Large spinner", size: 'large', labelPosition: 'left'});
    await p.add([smallSpinnerObject, largeSpinnerObject]);
    let ddObject = new pglet.Dropdown({label: "dropdown", optionKeys: ["small", "medium", "large"], optionValues: ["s", "m", "l"]});
    let checkBoxObject = new pglet.Checkbox({value: true, label: "testCheckbox"});
    let navObject = new pglet.Nav({value: "nav1", items: [
                        new pglet.Item({text: "heading1", items: [new pglet.Item({text: "sub1", icon: "mail", iconColor: "yellow"}), new pglet.Item({text: "sub2", icon: "chat", iconColor: "blue"})]}),
                        new pglet.Item({text: "heading2"})
                    ]});
                    
    let stackObject = new pglet.Stack({childControls: [ddObject, checkBoxObject, navObject]});
    // // console.log("call getCmdStr: ", stackObject.getCmdStr());
    const id = await p.add([stackObject]);

    // let spinButtonObject = new pglet.SpinButton({label: "test spin button", min: 0, max: 10})
    // let sliderObject = new pglet.Slider({label: "test slider", step: 1, min: 0, max: 100, showValue: true});
    // let toggleObject = new pglet.Toggle({label: "test toggle", onText: "on", offText: "off"})
    // await p.add(new pglet.Stack({ childControls: [sliderObject, spinButtonObject, toggleObject], width: "50%"}));

    // for (let i = 0; i < 11; i++) {
    //     progressObject.label = `Doing step ${i}..`
    //     progressObject.value = (i*10)
    //     await sleep(1000);
    //     await p.update(progressObject);

    // }
    // progressObject.label = "Completed!"
    // await p.update(progressObject);
    
    // console.log(id);
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        //await p.clean();
        await p.add([new pglet.Text({value: `Hello ${name}!`})])
        return
    }

    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add([buttonObject]);
    let gridColumns = [new pglet.Column({name: "Name", fieldName: "name", sortable: "true"}), new pglet.Column({name: "Age", fieldName: "age", sortable: "true"})];
    let items = [{name: "Art Farmer", age: 58}, {name: "Jim Hall", age: 56}, {name: "Steve Gadd", age: 42}]
    let gridObject = new pglet.Grid({columns: gridColumns, items: items});
    await p.add([gridObject]);
    // console.log("DONE!");
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 

