import Barchart from "../src/Barchart";
import Point from "../src/Point";
import { Control } from "../src/index";

test('Barchart add test', () => {
    let bc = new Barchart({ id: "new-barchart", dataMode: "default", tooltips: false, points: 
                        [new Point({legend: "A", x: 10, y: 200}), 
                        new Point({legend: "B", x: 20, y: 100})]    
                    });
    expect(bc instanceof Control).toBeTruthy();
    expect(bc instanceof Barchart).toBeTruthy();
    expect(bc.getControlName()).toBe("barchart");
    expect(bc.getCmdStr()).toBe(
        `barchart id="new-barchart" dataMode="default" tooltips="false"\n`+
        `  data\n`+
        `    p legend="A" x="10" y="200"\n`+
        `    p legend="B" x="20" y="100"`
    );
});
