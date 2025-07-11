import {ProjectManager} from "./projectManager";
import {StorageManager} from "./storageManager";
import {Project} from "./projects";


export function load_default_page() {
    try {
        const projectManager = new ProjectManager({
            storageManager: new StorageManager()
        });
        projectManager.loadFromLocalStorage();
        const projects = projectManager.getAllProjects();
        if (projects.length > 0) {
            const defaultProject = projectManager.getCurrentProject();
        } else {
            const defaultProject = new Project({name: "Default Project"});
            projectManager.addProject(defaultProject);
            projectManager.setCurrentProject(defaultProject.id);
        }

        const content = document.querySelector("#content");
        content.textContent = "";

        const projectManagerCard = document.createElement("div");
        projectManagerCard.classList.add("project-manager-card");
        projectManagerCard.textContent = "Project Manager";

        if (projects.length > 0) {
            projects.forEach(project => {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");
                projectCard.textContent = project.name;
                projectCard.addEventListener("click", () => {
                    projectManager.setCurrentProject(project.id);
                    load_default_page(); // Reload to show the current project
                });
                projectManagerCard.appendChild(projectCard);
            });
        }
        content.appendChild(projectManagerCard);
    } catch (error) {
        console.error("Error loading default page:", error);
        const content = document.querySelector("#content");
        content.textContent = "Failed to load projects. Please try again later.";
    }
}
