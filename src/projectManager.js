import { v4 as uuidv4 } from "uuid";
import { Project } from "./projects";

export class ProjectManager {
	constructor({ projects = [], currentProjectId = null, storageManager }) {
		this.projects = projects;
		this.currentProjectId = currentProjectId;
		this.storageManager = storageManager;
		this.isLoaded = false; // Track if we've loaded from storage
	}

	async loadFromStorage() {
		if (this.isLoaded) return; // Don't load twice

		try {
			const projectsData = this.storageManager.loadData("projects");
			const currentProjectId = this.storageManager.loadData("currentProjectId");

			if (projectsData && Array.isArray(projectsData)) {
				this.projects = projectsData.map((json) => Project.fromJSON(json));
				console.log(`Loaded ${this.projects.length} projects from storage`);
			}

			if (currentProjectId) {
				this.currentProjectId = currentProjectId;
			}

			this.isLoaded = true;
		} catch (error) {
			console.error("Failed to load from storage:", error);
		}
	}

	addProject(project) {
		if (!(project instanceof Project)) {
			throw new Error("Must provide a valid Project instance");
		}

		const exists = this.projects.some((p) => p.id === project.id);
		if (exists) {
			console.warn(`Project with id ${project.id} already exists`);
			return this;
		}

		this.projects.push(project);
		this.saveToStorage(); // Auto-save after changes
		return this;
	}

	setCurrentProject(projectId) {
		this.currentProjectId = projectId;
	}

	getCurrentProject() {
		return this.projects.find(
			(project) => project.id === this.currentProjectId,
		);
	}

	async saveToStorage() {
		try {
			const projectsData = this.projects.map((project) => project.toJSON());
			this.storageManager.saveData("projects", projectsData);

			if (this.currentProjectId) {
				this.storageManager.saveData("currentProjectId", this.currentProjectId);
			}

			console.log(`Saved ${this.projects.length} projects to storage`);
		} catch (error) {
			console.error("Failed to save to storage:", error);
		}
	}

	getAllProjects() {
		return [...this.projects]; // Return copy, don't load from storage here
	}
}
