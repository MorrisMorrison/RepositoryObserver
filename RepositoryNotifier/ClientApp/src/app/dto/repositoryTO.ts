// https://stackoverflow.com/questions/34997128/angular-2-get-values-of-multiple-checked-checkboxes
export class RepositoryTO {
    name: string;
    selected: boolean;

    constructor(name: string, selected: boolean) {
        this.name = name;
        this.selected = selected;
    }
}

