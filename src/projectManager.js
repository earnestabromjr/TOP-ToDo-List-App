import {v4 as uuidv4} from "uuid";

export class ProjectManager {
    constructor({
        projects = [],
        currentProjectId = uuidv4(),
                }) {
    this.projects = projects;
    this.currentProjectId = currentProjectId;
    }

    addProject(project) {
        if (!this.projects.includes(project)) {
            this.projects.push(project);
            return this.projects;
        }
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
            return this.projects;
        }
        return null;
    }

    getProject() {

    }

    getAllProjects() {

    }
    setCurrentProject(projectId) {
        this.currentProjectId = projectId;
    }

    getCurrentProject() {
        return this.projects.find(project => project.id === this.currentProjectId);
    }

    saveToLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
        localStorage.setItem("currentProjectId", this.currentProjectId);
    }

    loadFromLocalStorage() {
        const projectsData = localStorage.getItem("projects");
        const currentProjectId = localStorage.getItem("currentProjectId");

        if (projectsData) {
            this.projects = JSON.parse(projectsData);
        }

        if (currentProjectId) {
            this.currentProjectId = currentProjectId;
        }
    }
}