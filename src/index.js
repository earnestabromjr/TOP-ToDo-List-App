import "./style.css";

import { Todo } from "./todo.js";
import { Project } from "./projects";
import { ProjectManager } from "./projectManager";
import { StorageManager } from "./storageManager";
import { TodoUI, AddUiInputs } from "./todoui.js";

document.addEventListener("DOMContentLoaded", async () => {
	const storageManager = new StorageManager();
	const projectManager = new ProjectManager({ storageManager });
	const todoUI = new TodoUI(projectManager, storageManager);
	const ui = new AddUiInputs(projectManager, todoUI);

	// FIRST: Load existing data from storage
	await projectManager.loadFromStorage();

	// THEN: Check if we need to create default data
	if (projectManager.getAllProjects().length === 0) {
		console.log("No projects found, creating default project");

		const defaultProject = new Project({});
		defaultProject.addName("My First Project");

		// Add some sample todos
		const todo1 = new Todo({
			title: "Learn JavaScript",
			dueDate: new Date(),
			priority: 1,
			description: "Learn JavaScript by watching tutorials",
			completed: false,
		});

		const todo2 = new Todo({
			title: "Finish Project",
			dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			priority: 2,
			description: "Complete the project by the end of the week",
			completed: false,
		});

		defaultProject.addTodo(todo1);
		defaultProject.addTodo(todo2);

		projectManager.addProject(defaultProject);
		projectManager.setCurrentProject(defaultProject.id);
	}

	// FINALLY: Initialize UI with loaded/created data
	todoUI.loadDefaultPage();
	ui.renderAddTodoButton();

	const currentProject = projectManager.getCurrentProject();
	if (currentProject) {
		todoUI.renderTodos(currentProject.getTodos());
	}
});
