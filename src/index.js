import "./style.css";
import { Todo } from "./todo.js";
import { Project } from "./projects";
import { ProjectManager } from "./projectManager";
import { StorageManager } from "./storageManager";
import { todoUI } from "./todoui";

const project = new Project({});
project.addName("My First Project");
const storageManager = new StorageManager();
const projectManager = new ProjectManager({
	storageManager: storageManager,
});

const todo = {
	title: "Learn JavaScript",
	dueDate: Date.now(),
	priority: 1,
	description: "Learn JavaScript by watching the tutorial",
	completed: false,
};

const todoInstance = new Todo(todo);
project.addTodo(todoInstance);
todoInstance.setProperty("completed", true);
// console.log(project.getTodos());

project.addTodo(
	Todo.addTodo({
		title: "Finish Project",
		dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
		priority: 2,
		description: "Complete the project by the end of the week",
		completed: false,
	}),
);

projectManager.addProject(project);
projectManager.saveToLocalStorage();

const storedProjects = storageManager.loadData("projects");
// console.log(storedProjects[0].name);

function createProjectArray(storedProjects) {
	const projectsArray = [];
	storedProjects.forEach((projectData) => {
		projectsArray.push(projectData);
	});
	return projectsArray;
}
let projectsArray = createProjectArray(storedProjects);
// console.log(project.getTodos());
project.getTodoById(); //
// console.log(project.getTodos()[0].getProperty("title"));

// const content = document.querySelector("#content");
// const card = document.createElement("div");

// card.textContent = todoInstance.getProperty("title");

// card.classList.add("card");

// content.append(card);
// console.log(ui.uiElements)
todoUI.load_default_page(projectManager, storageManager);
todoUI.loadTodoPage(project.getTodos());
console.log(projectsArray[0].todos[0].dueDate);
