export class Project {
    constructor(name) {
        this.name = name;
        this.projectArray = [];
    }

    addProject(project) {
        if (!this.projectArray.includes(project)) {
            this.projectArray.push(project);
            return this.projectArray;
        }
    }

}