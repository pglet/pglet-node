
export interface Command {

    readonly indent: number;
    readonly name: string;
    readonly values: string[];
    readonly attrs: { name: string; value: string };
    readonly lines: string[];
    readonly commands: Command[];

}