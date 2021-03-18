import { Control, Grid, Column, Item } from "../src/index"

test('Grid add test', () => {
    let grid = new Grid({ columns: [new Column({name: "key1", fieldName: "key1"}), new Column({name: "key2", fieldName: "key2"})], 
                          items: [new Item({key1: "value1", key2: "value2"}), new Item({key1: "value1", key2: "value2"})] 
                        });
    expect(grid instanceof Control).toBeTruthy();
    expect(grid.getControlName()).toBe("grid");
    expect(grid.getCmdStr()).toBe(
        `grid\n` +
        `  columns\n` +
        `    column name="key1" fieldName="key1"\n` +
        `    column name="key2" fieldName="key2"\n` +
        `  items\n` +
        `    item key1="value1" key2="value2"\n` +
        `    item key1="value1" key2="value2"`    
    );
});
