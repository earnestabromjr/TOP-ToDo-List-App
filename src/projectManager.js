import {v4 as uuidv4} from "uuid";
import {Project} from "./projects";

export class ProjectManager {
    constructor({
                    projects = [],
                    currentProjectId = uuidv4(),
                    storageManager
                }) {
        this.projects = projects;
        this.currentProjectId = currentProjectId;
        this.storageManager = storageManager;
    }

    addProject(project) {
        if (!this.projects.includes(project)) {
            this.projects.push(project);
            return this.projects;
        }
        return "Project already exists";
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
            return this.projects;
        }
        return null;
    }

    getProject(projects) {
        return this.projects.find((project) => project.id === project);
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
        const projectsData = this.projects.map(project => project.toJSON());
        this.storageManager.saveData('projects', projectsData);
        this.storageManager.saveData('currentProjectId', this.currentProjectId);
    }

    loadFromLocalStorage() {
        const projectsData = this.storageManager.loadData('projects');
        const currentProjectId = this.storageManager.loadData('currentProjectId');
        if (projectsData) {
            this.projects = projectsData.map(json => Project.fromJSON(json));
        }
        if (currentProjectId) {
            this.currentProjectId = currentProjectId;
        }
    }
}