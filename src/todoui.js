import { ProjectManager } from "./projectManager";
import { StorageManager } from "./storageManager";
import { Project } from "./projects";


export class TodoUI {

    constructor() {
        this.projectManager = new ProjectManager({
            storageManager: new StorageManager()
        });
        this.storageManager = new StorageManager();
        this.uiElements = {
            content: document.querySelector("#content"),
            projectSidebar: document.createElement("div"),
            projectManagerCard: document.getElementById("projects"),
            projectManagerTitle: document.createElement("h2")
        };
    }


    load_default_page() {
        try {
            // const projectManager = new ProjectManager({
            //     storageManager: new StorageManager()
            // });
            const storedProjects = this.storageManager.loadData('projects');
            const projects = storedProjects.map(projectData => Project.fromJSON(projectData));
            if (projects.length > 0) {
                const defaultProject = this.projectManager.getCurrentProject();
            } else {
                const defaultProject = new Project({ name: "Default Project" });
                this.projectManager.addProject(defaultProject);
                this.projectManager.setCurrentProject(defaultProject.id);
            }

            this.uiElements.content.textContent = "";

            this.uiElements.projectManagerCard.classList.add("project-manager-card");

            if (projects.length > 0) {
                projects.forEach(project => {
                    const projectCard = document.createElement("div");
                    projectCard.classList.add("project-card");
                    projectCard.textContent = project.name;
                    projectCard.addEventListener("click", () => {
                        this.projectManager.setCurrentProject(project.id);
                        this.load_default_page(); // Reload to show the current project
                    });
                    this.uiElements.projectManagerCard.appendChild(projectCard);
                });
            }
            this.uiElements.content.appendChild(this.uiElements.projectManagerCard);
        } catch (error) {
            console.error("Error loading default page:", error);
            this.uiElements.content.textContent = "Failed to load projects. Please try again later.";
        }
    }
}
