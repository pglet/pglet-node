import Progress from "../src/Progress";
import { Control } from "../src/index";

test('Progress add test', () => {
    let progress = new Progress({ value: 10, label: "progressLabel"});
    expect(progress instanceof Control).toBeTruthy();
    expect(progress.getControlName()).toMatchObject("progress");
    expect(progress.getCmds()).toMatchObject(
        `progress value="10" label="progressLabel"` 
    );
});