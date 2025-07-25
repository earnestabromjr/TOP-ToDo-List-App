import { Project } from "./projects";


export class TodoUI{
	constructor(projectManager, storageManager) {
		this.projectManager = projectManager;
		this.storageManager = storageManager;
		this.uiElements = {
			body: document.querySelector("body"),
			content: document.getElementById("content"),
			projectSidebar: document.createElement("div"),
			projectManagerCard: document.getElementById("projects"),
			projectManagerTitle: document.createElement("h2"),
			todoList: document.createElement("div"),
			todos: document.getElementById("todos"),
		};
	}

	load_default_page() {
		try {
			const storedProjects = this.storageManager.loadData("projects");
			const projects = storedProjects.map((projectData) =>
				Project.fromJSON(projectData),
			);
			if (projects.length > 0) {
				const defaultProject = this.projectManager.getCurrentProject();
			} else {
				const defaultProject = new Project({ name: "Default Project" });//=obj
				this.projectManager.addProject(defaultProject);
				this.projectManager.setCurrentProject(defaultProject.id);
			}

			this.uiElements.content.textContent = "";
			this.uiElements.projectManagerCard.classList.add("project-manager-card");

			if (projects.length > 0) {
				projects.forEach((project) => {
					const projectCard = document.createElement("div");
					projectCard.classList.add("project-card");
					projectCard.textContent = project.name;
					projectCard.addEventListener("click", () => {
						this.projectManager.setCurrentProject(project.id);
						// this.load_default_page(); // Reload to show the current project
					});
					this.uiElements.projectManagerCard.appendChild(projectCard);
				});
			}
			this.uiElements.projectManagerTitle.textContent = "Projects";
			this.uiElements.content.appendChild(this.uiElements.projectManagerTitle);
			this.uiElements.content.appendChild(this.uiElements.projectManagerCard);
		} catch (error) {
			console.error("Error loading default page:", error);
			this.uiElements.content.textContent =
				"Failed to load projects. Please try again later.";
		}
	}
	loadTodoPage(project) {
		try {
			this.uiElements.todos.textContent = "";
			const todoList = document.createElement("div");
			todoList.classList.add("todo-list");

			project.forEach((todo) => {
				const todoCard = document.createElement("div");
				todoCard.classList.add("todo-card");
				todoCard.textContent = todo.getProperty("title") || "Untitled Todo";

				todoCard.addEventListener("click", () => {
					// Handle todo click, e.g., show details or edit
					console.log(todo);
					if (todo) {
						const todoDetails = document.createElement("div");
						todoDetails.classList.add("todo-details");
						todoDetails.innerHTML = `
                            <h3>${todo.title}</h3>
                            <p>Due Date: ${todo.dueDate}</p>
                            <p>Priority: ${todo.priority}</p>
                            <p>Description: ${todo.description}</p>
                            <p>Completed: ${todo.completed ? "Yes" : "No"}</p>
                        `;
						this.uiElements.todos.textContent = "";
						this.uiElements.todos.appendChild(todoDetails);
					}
				});
				todoList.appendChild(todoCard);
			});

			this.uiElements.content.appendChild(todoList);
		} catch (error) {
			console.error("Error loading Todo page:", error);
			this.uiElements.content.textContent =
				"Failed to load todos. Please try again later.";
		}
	}

	loadNewProjectPage() {
		try {
			const newProjectForm = document.createElement("form");
			newProjectForm.classList.add("new-project-form");
			const projectNameInput = document.createElement("input");
			projectNameInput.type = "text";
			projectNameInput.placeholder = "Project Name";
			projectNameInput.required = true;
			const createProjectButton = document.createElement("button");
			createProjectButton.type = "submit";
			createProjectButton.textContent = "Create Project";
			newProjectForm.appendChild(projectNameInput);
			newProjectForm.appendChild(createProjectButton);
			newProjectForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const projectName = projectNameInput.value.trim();
				if (projectName) {
					const newProject = new Project({ name: projectName });
					this.projectManager.addProject(newProject);
					this.storageManager.saveData(
						"projects",
						this.projectManager.getAllProjects(), 
					);
				}
			});
			// this.load_default_page();
			// this.uiElements.todos.textContent = "";
			this.uiElements.todos.appendChild(newProjectForm);
			this.uiEvents();
		} catch (error) {
			console.error("Error loading New Project page:", error);
			this.uiElements.content.textContent =
				"Failed to load New Project page. Please try again later.";
		}
	}
	uiEvents() {
		try {
			const projectCardBtn = document.querySelector(".project-card");
			const storedProjects = this.storageManager.loadData("projects");
			const projects = storedProjects.map((projectData) =>
				Project.fromJSON(projectData),
			);
			const projectDisplay = document.createElement("div");
			projectDisplay.classList.add("project-display")
			projectCardBtn.addEventListener("click", () => {
				// this.uiElements.content.textContent = "";
				projects.forEach((project) => {
					projectDisplay.textContent = project.name;
					console.log(project.name);
				});
			});
			// this.uiElements.content.textContent = "";
			this.uiElements.content.appendChild(projectDisplay)
		} catch (error) {
			console.error("Error loading UI events:", error);
		}
	}
}
