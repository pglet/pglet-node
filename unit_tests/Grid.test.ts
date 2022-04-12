import { Control, Grid, Column } from "../src/index"

test('Grid add test', () => {
    let grid = new Grid({ columns: [new Column({name: "key1", fieldName: "key1"}), new Column({name: "key2", fieldName: "key2"})], 
                          items: [{key1: "value1", key2: "value2"}, {key1: "value1", key2: "value2"}]
                        });
    expect(grid instanceof Control).toBeTruthy();
    expect(grid.getControlName()).toBe("grid");
    expect(grid.getCmds()).toMatchObject([
        { indent: 0, values: ['grid'], attrs: {}, commands: [] },
        { indent: 2, values: ['columns'], attrs: {}, commands: [] },
        { indent: 4, values: ['column'], attrs: {name: 'key1', fieldName: 'key1'}, commands: [] },
        { indent: 4, values: ['column'], attrs: {name: 'key2', fieldName: 'key2'}, commands: [] },
        { indent: 2, values: ['items'], attrs: {}, commands: [] },
        { indent: 4, values: ['item'], attrs: {key1: 'value1', key2: 'value2'}, commands: [] },
        { indent: 4, values: ['item'], attrs: {key1: 'value1', key2: 'value2'}, commands: [] }
    ]);
});
    
