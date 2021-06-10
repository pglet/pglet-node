import SpinButton from "../src/SpinButton";
import { Control } from "../src/index";

test('spinButton add test', () => {
    let spinButton = new SpinButton({ label: "spinButtonLabel", min: 0, max: 10});
    expect(spinButton instanceof Control).toBeTruthy();
    expect(spinButton.getControlName()).toBe("spinbutton");
    expect(spinButton.getCmdStr()).toBe(
        `spinbutton label="spinButtonLabel" min="0" max="10"` 
    );
});