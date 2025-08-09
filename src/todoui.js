import { Project } from "./projects";
import { Todo } from "./todo";

export class TodoUI {
	constructor(projectManager, storageManager) {
		this.projectManager = projectManager;
		this.storageManager = storageManager;
		this.uiElements = {
			app: document.getElementById("app"),
			body: document.querySelector("body"),
			content: document.getElementById("content"),
			container: document.getElementById("container"),
			projectSidebar: document.createElement("div"),
			projectManagerCard: document.getElementById("projects"),
			projectManagerTitle: document.createElement("h2"),
			todoList: document.createElement("div"),
			todos: document.getElementById("todos"),
			addTodoButton: document.getElementById("add-todo-btn"),
		};
	}

	// Validation methods
	validateProjectInput(input) {
		const errors = [];

		// Check if name exists and is not empty
		if (!input.name || input.name.trim() === "") {
			errors.push("Project name is required");
		}

		// Check name length
		if (input.name && input.name.trim().length < 2) {
			errors.push("Project name must be at least 2 characters long");
		}

		if (input.name && input.name.trim().length > 50) {
			errors.push("Project name must be less than 50 characters");
		}

		// Check for duplicate project names
		const existingProjects = this.projectManager.projects;
		const isDuplicate = existingProjects.some(
			(project) =>
				project.name.toLowerCase() === input.name.trim().toLowerCase(),
		);
		if (isDuplicate) {
			errors.push("A project with this name already exists");
		}

		return {
			isValid: errors.length === 0,
			errors,
		};
	}

	validateTodoInput(input) {
		const errors = [];

		// Check if title exists and is not empty
		if (!input.title || input.title.trim() === "") {
			errors.push("Todo title is required");
		}

		// Check title length
		if (input.title && input.title.trim().length < 3) {
			errors.push("Todo title must be at least 3 characters long");
		}

		if (input.title && input.title.trim().length > 100) {
			errors.push("Todo title must be less than 100 characters");
		}

		// Check description length
		if (input.description && input.description.trim().length > 500) {
			errors.push("Description must be less than 500 characters");
		}

		// Check due date
		if (input.dueDate) {
			const dueDate = new Date(input.dueDate);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (isNaN(dueDate.getTime())) {
				errors.push("Invalid due date format");
			} else if (dueDate < today) {
				errors.push("Due date cannot be in the past");
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
		};
	}

	showValidationErrors(errors, container) {
		// Clear previous errors
		const existingErrors = container.querySelector(".validation-errors");
		if (existingErrors) {
			existingErrors.remove();
		}

		if (errors.length === 0) return;

		const errorContainer = document.createElement("div");
		errorContainer.classList.add("validation-errors");
		errorContainer.style.cssText = `
      color: #dc3545;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      padding: 10px;
      margin: 10px 0;
      font-size: 14px;
    `;

		const errorList = document.createElement("ul");
		errorList.style.cssText = "margin: 0; padding-left: 20px;";

		errors.forEach((error) => {
			const errorItem = document.createElement("li");
			errorItem.textContent = error;
			errorList.appendChild(errorItem);
		});

		errorContainer.appendChild(errorList);
		container.appendChild(errorContainer);
	}

	clearValidationErrors(container) {
		const existingErrors = container.querySelector(".validation-errors");
		if (existingErrors) {
			existingErrors.remove();
		}
	}

	renderProjects() {
		this.uiElements.projectManagerCard.innerHTML = "";
		const projects = this.projectManager.projects;
		projects.forEach((project) => {
			const projectCard = document.createElement("div");
			projectCard.classList.add("project-card");
			projectCard.textContent = project.name;
			projectCard.addEventListener("click", () => {
				this.projectManager.setCurrentProject(project.id);
				this.renderTodos();
			});
			this.uiElements.projectManagerCard.appendChild(projectCard);
		});
		this.uiElements.projectManagerTitle.textContent = "Projects";
		this.uiElements.content.appendChild(this.uiElements.projectManagerTitle);
		this.uiElements.content.appendChild(this.uiElements.projectManagerCard);
	}

	renderTodos() {
		this.uiElements.container.innerHTML = "";
		const currentProject = this.projectManager.getCurrentProject();
		if (!currentProject) return;
		const todos = currentProject.getTodos();
		const todoList = document.createElement("div");
		todoList.classList.add("todo-list");
		todos.forEach((todo) => {
			const todoCard = document.createElement("div");
			todoCard.classList.add("todo-card");
			todoCard.textContent = todo.title || "Untitled Todo";
			todoCard.addEventListener("click", () => {
				this.renderTodoDetails(todo);
			});
			todoList.appendChild(todoCard);
		});
		this.uiElements.container.appendChild(todoList);
		// const addTodoButton = document.getElementById("add-todo-btn");
		// addTodoButton.insertBefore(todoList, addTodoButton.firstChild);
	}

	renderTodoDetails(todo) {
		this.uiElements.todos.innerHTML = "";
		const todoDetails = document.createElement("div");
		todoDetails.classList.add("todo-details");
		todoDetails.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due Date: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Description: ${todo.description}</p>
      <p>Completed: ${todo.completed ? "Yes" : "No"}</p>
			<input type="radio" name="completed" value="true" ${
				todo.completed ? "checked" : ""
			}> Yes
			<input type="radio" name="completed" value="false" ${
				todo.completed ? "" : "checked"
			}> No
    `;
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete Todo";
		deleteButton.addEventListener("click", () => {
			this.projectManager.getCurrentProject().removeTodo(todo.id);
			this.renderTodos();
		});
		todoDetails.appendChild(deleteButton);
		this.uiElements.todos.appendChild(todoDetails);
	}

	renderAddTodoForm() {
		this.uiElements.todos.innerHTML = "";
		const addTodoForm = document.createElement("form");
		addTodoForm.classList.add("add-todo-form");

		const formContainer = document.createElement("div");
		formContainer.style.cssText = "max-width: 400px; margin: 0 auto;";

		const todoTitleInput = document.createElement("input");
		todoTitleInput.type = "text";
		todoTitleInput.placeholder = "Todo Title *";
		todoTitleInput.id = "todo-title-input";
		todoTitleInput.required = true;
		todoTitleInput.style.cssText = "width: 100%; margin: 5px 0; padding: 8px;";

		const todoDescriptionInput = document.createElement("input");
		todoDescriptionInput.id = "todo-description-input";
		todoDescriptionInput.type = "text";
		todoDescriptionInput.placeholder = "Todo Description (optional)";
		todoDescriptionInput.style.cssText =
			"width: 100%; margin: 5px 0; padding: 8px;";

		const todoDueDateInput = document.createElement("input");
		todoDueDateInput.type = "date";
		todoDueDateInput.id = "todo-due-date-input";
		todoDueDateInput.style.cssText =
			"width: 100%; margin: 5px 0; padding: 8px;";

		const addTodoButton = document.createElement("button");
		addTodoButton.id = "add-todo-form-btn";
		addTodoButton.type = "submit";
		addTodoButton.textContent = "Add Todo";
		addTodoButton.style.cssText =
			"width: 100%; margin: 5px 0; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;";

		formContainer.appendChild(todoTitleInput);
		formContainer.appendChild(todoDescriptionInput);
		formContainer.appendChild(todoDueDateInput);
		formContainer.appendChild(addTodoButton);
		addTodoForm.appendChild(formContainer);

		addTodoForm.addEventListener("submit", (event) => {
			event.preventDefault();

			// Clear previous validation errors
			this.clearValidationErrors(formContainer);

			const input = {
				title: todoTitleInput.value.trim(),
				description: todoDescriptionInput.value.trim(),
				dueDate: todoDueDateInput.value,
			};

			// Validate input
			const validation = this.validateTodoInput(input);

			if (!validation.isValid) {
				this.showValidationErrors(validation.errors, formContainer);
				return;
			}

			const currentProject = this.projectManager.getCurrentProject();
			if (!currentProject) {
				this.showValidationErrors(
					["Please select a project first"],
					formContainer,
				);
				return;
			}

			try {
				const newTodo = new Todo({
					title: input.title,
					description: input.description,
					dueDate: input.dueDate,
				});

				currentProject.addTodo(newTodo);
				this.projectManager.saveToStorage();
				this.renderTodos();

				// Show success message
				const successMessage = document.createElement("div");
				successMessage.textContent = "Todo created successfully!";
				successMessage.style.cssText =
					"color: #28a745; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; padding: 10px; margin: 10px 0;";
				formContainer.appendChild(successMessage);

				// Clear form
				addTodoForm.reset();

				// Remove success message after 3 seconds
				setTimeout(() => {
					successMessage.remove();
				}, 3000);
			} catch (error) {
				this.showValidationErrors([error.message], formContainer);
			}
		});

		// const addTodoBtn = document.getElementById("add-todo-btn");
		// addTodoBtn.insertBefore(addTodoForm, addTodoBtn.firstChild);
		this.uiElements.todos.appendChild(addTodoForm);
	}

	renderNewProjectForm() {
		this.uiElements.todos.innerHTML = "";
		const newProjectForm = document.createElement("form");
		newProjectForm.classList.add("new-project-form");

		const formContainer = document.createElement("div");
		formContainer.style.cssText = "max-width: 400px; margin: 0 auto;";

		const projectNameInput = document.createElement("input");
		projectNameInput.type = "text";
		projectNameInput.placeholder = "Project Name *";
		projectNameInput.required = true;
		projectNameInput.style.cssText =
			"width: 100%; margin: 5px 0; padding: 8px;";

		const createProjectButton = document.createElement("button");
		createProjectButton.id = "create-project-btn";
		createProjectButton.type = "submit";
		createProjectButton.textContent = "Create Project";
		createProjectButton.style.cssText =
			"width: 100%; margin: 5px 0; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;";

		formContainer.appendChild(projectNameInput);
		formContainer.appendChild(createProjectButton);
		newProjectForm.appendChild(formContainer);

		newProjectForm.addEventListener("submit", (event) => {
			event.preventDefault();

			// Clear previous validation errors
			this.clearValidationErrors(formContainer);

			const input = {
				name: projectNameInput.value.trim(),
			};

			// Validate input
			const validation = this.validateProjectInput(input);

			if (!validation.isValid) {
				this.showValidationErrors(validation.errors, formContainer);
				return;
			}

			try {
				const newProject = new Project({ name: input.name });
				this.projectManager.addProject(newProject);
				this.projectManager.saveToStorage();
				this.renderProjects();

				// Show success message
				const successMessage = document.createElement("div");
				successMessage.textContent = "Project created successfully!";
				successMessage.style.cssText =
					"color: #28a745; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; padding: 10px; margin: 10px 0;";
				formContainer.appendChild(successMessage);

				// Clear form
				newProjectForm.reset();

				// Remove success message after 3 seconds
				setTimeout(() => {
					successMessage.remove();
				}, 3000);
			} catch (error) {
				this.showValidationErrors([error.message], formContainer);
			}
		});

		this.uiElements.todos.appendChild(newProjectForm);
	}

	loadDefaultPage() {
		this.uiElements.app.appendChild(this.uiElements.content);
		this.uiElements.content.innerHTML = "";
		this.renderProjects();
		this.renderTodos();
		this.uiElements.app.appendChild(this.uiElements.todos);
	}
}

export class AddUiInputs extends TodoUI {
	constructor(projectManager, storageManager, todo) {
		super(projectManager, storageManager);
		this.todo = todo;
		this.uiElements.todos.innerHTML = "";
		this.renderAddTodoForm();
	}

	renderAddTodoButton() {
		const projectBtn = document.getElementById("project");
		projectBtn.addEventListener("click", () => this.renderNewProjectForm());

		const addTodoBtn = document.createElement("button");
		addTodoBtn.id = "add-todo-btn";
		addTodoBtn.textContent = "Add Todo";
		addTodoBtn.addEventListener("click", () => {
			this.renderAddTodoForm();
		});
		const navbar = document.querySelector("nav");
		navbar.appendChild(addTodoBtn);
	}

	renderProjectDropdown() {
		const ProjectDropdown = document.createElement("select");
		ProjectDropdown.id = "project-dropdown";
		const projects = this.projectManager.getAllProjects();
		if (projects.length === 0) {
			const option = document.createElement("option");
			option.value = "";
			option.textContent = "No projects available";
			ProjectDropdown.appendChild(option);
		}
		projects.forEach((project) => {
			const option = document.createElement("option");
			option.value = project.id;
			option.textContent = project.name;
			ProjectDropdown.appendChild(option);
		});
	}
}
