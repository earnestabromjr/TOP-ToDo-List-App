import { v4 as uuidv4 } from "uuid";
import { Project } from "./projects";

export class ProjectManager {
  constructor({ projects = [], currentProjectId = uuidv4(), storageManager }) {
    this.projects = projects;
    this.currentProjectId = currentProjectId;
    this.storageManager = storageManager;
  }

  addProject(project) {
    if (!(project instanceof Project)) {
      throw new Error(`Must provide a valid instance of Project`);
    }
    if (this.projects.some((p) => p.id === project.id)) {
      throw new Error(`Project with id ${project.id} already exists`);
    }
    this.projects.push(project);
    return this;
  }

  removeProject(projectId) {
    const index = this.projects.findIndex(p => p.id === projectId );
    if (index === -1) {
		throw new Error(`Project with id ${projectId} not found`);
    }
	this.projects.slice(index, 1);
    return this;
  }

  get getProject() {
    return this.projects.find((project) => project.id === project);
  }

  getAllProjects() {
    if (this.projects.length === 0) {
      return "No projects available";
    }
    let loadedProjects = this.storageManager.loadData("projects");
    if (loadedProjects) {
      this.projects = loadedProjects.map((json) => Project.fromJSON(json));
    }
    return loadedProjects || this.projects;
  }

  setCurrentProject(projectId) {
    this.currentProjectId = projectId;
  }

  getCurrentProject() {
    return this.projects.find(
      (project) => project.id === this.currentProjectId
    );
  }

  saveToLocalStorage() {
    const projectsData = this.projects.map((project) => project.toJSON());
    this.storageManager.saveData("projects", projectsData);
    this.storageManager.saveData("currentProjectId", this.currentProjectId);
  }

  loadFromLocalStorage() {
    const projectsData = this.storageManager.loadData("projects");
    const currentProjectId = this.storageManager.loadData("currentProjectId");
    if (projectsData) {
      this.projects = projectsData.map((json) => Project.fromJSON(json));
    }
    if (currentProjectId) {
      this.currentProjectId = currentProjectId;
    }
  }
}
