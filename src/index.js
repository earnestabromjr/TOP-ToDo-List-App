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
    defaultProject.setName("My First Project");
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
const displayTodos = document.getElementById("todo");
displayTodos.addEventListener("click", (e) => {
  const storageManager = new StorageManager();
  const projectManager = new ProjectManager({ storageManager });
  const todoUI = new TodoUI(projectManager, storageManager);
  if (e.target.classList.contains("todo-item")) {
    todoUI.renderTodos();
  }
});
