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
            body: document.querySelector("body"),
            content: document.getElementById("content"),
            projectSidebar: document.createElement("div"),
            projectManagerCard: document.getElementById("projects"),
            projectManagerTitle: document.createElement("h2"),
            todos: document.getElementById("todos"),
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
            this.uiElements.projectManagerTitle.textContent = "Projects";
            this.uiElements.content.appendChild(this.uiElements.projectManagerTitle)
            this.uiElements.content.appendChild(this.uiElements.projectManagerCard);
        } catch (error) {
            console.error("Error loading default page:", error);
            this.uiElements.content.textContent = "Failed to load projects. Please try again later.";
        }
    }
    loadTodoPage(project) {
        try {
            this.uiElements.todos.textContent = "";
            const todoList = document.createElement("div");
            todoList.classList.add("todo-list");

            project.forEach(todo => {
                const todoCard = document.createElement("div");
                todoCard.classList.add("todo-card");
                todoCard.textContent = todo.title;
                todoCard.addEventListener("click", () => {
                    // Handle todo click, e.g., show details or edit
                    let todoItem = this.projectManager.getCurrentProject().getTodoById(todo.id);
                    if (todoItem) {
                        const todoDetails = document.createElement("div");
                        todoDetails.classList.add("todo-details");
                        todoDetails.innerHTML = `
                            <h3>${todoItem.title}</h3>
                            <p>Due Date: ${todoItem.dueDate ? todoItem.dueDate.toLocaleDateString() : "No due date"}</p>
                            <p>Priority: ${todoItem.priority}</p>
                            <p>Description: ${todoItem.description}</p>
                            <p>Completed: ${todoItem.completed ? "Yes" : "No"}</p>
                        `;
                        this.uiElements.todo.textContent = "";
                        this.uiElements.todo.appendChild(todoDetails);
                    }
                });
                todoList.appendChild(todoCard);
            });

            this.uiElements.todos.appendChild(todoList);
        } catch (error) {
            console.error("Error loading Todo page:", error);
            this.uiElements.content.textContent = "Failed to load todos. Please try again later.";
        }
    }
}
