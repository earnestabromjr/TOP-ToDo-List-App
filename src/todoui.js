import {ProjectManager} from "./projectManager";

export class TodoUI {
    constructor({
        projectManager = new ProjectManager({})
    }) {
        this.projectManager = projectManager;
    }

    render() {
        const content = document.querySelector("#content");
        content.innerHTML = ""; // Clear previous content

        this.projectManager.projects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.textContent = project.name;

            project.getTodos().forEach(todo => {
                const todoCard = document.createElement("div");
                todoCard.classList.add("todo-card");
                todoCard.textContent = todo.getProperty("title");
                projectCard.appendChild(todoCard);
            });

            content.appendChild(projectCard);
        });
    }
}