import { Control, Barchart, Point } from "../src/index";

test('Barchart add test', () => {
    let bc = new Barchart({ id: "new-barchart", dataMode: "default", tooltips: false, points: 
                        [new Point({legend: "A", x: 10, y: 200}), 
                        new Point({legend: "B", x: 20, y: 100})]    
                    });
    expect(bc instanceof Control).toBeTruthy();
    expect(bc instanceof Barchart).toBeTruthy();
    expect(bc.getControlName()).toBe("barchart");
    expect(bc.getCmds()).toMatchObject([
        { indent: 0, values: ['barchart'], attrs: {id: 'new-barchart', dataMode: 'default', tooltips: 'false'}, commands: [] },
        { indent: 2, values: ['data'], attrs: {}, commands: [] },
        { indent: 4, values: ['p'], attrs: {legend: 'A', x: '10', y: '200'}, commands: [] },
        { indent: 4, values: ['p'], attrs: {legend: 'B', x: '20', y: '100'}, commands: [] }
    ]);
});
