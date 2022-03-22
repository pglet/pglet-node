
export class Command {

    indent?: number = 0;
    name?: string;
    values?: string[] = [];
    attrs?: { [name: string]: string } = {};
    lines?: string[];
    commands?: Command[];

}