import "./style.css";
import { Todo } from './todo.js';
import { Project } from "./projects";
import { ProjectManager } from "./projectManager";
import { StorageManager } from "./storageManager";
import { load_default_page} from "./todoui";

const project = new Project({});
project.addName("My First Project");
const storageManager = new StorageManager();
const projectManager = new ProjectManager({
    storageManager: storageManager
});

const todo = {
    title: "Learn JavaScript",
    dueDate: Date.now(),
    priority: 1,
    description: "Learn JavaScript by watching the tutorial",
    completed: false
}

const todoInstance = new Todo(todo);
project.addTodo(todoInstance);
todoInstance.setProperty("completed", true);
console.log(project.getTodos());

project.addTodo(Todo.addTodo({
    title: "Finish Project",
    dueDate: Date.now(),
    priority: 2,
    description: "Complete the project by the end of the week",
    completed: false
}))

projectManager.addProject(project);
projectManager.saveToLocalStorage();

const storedProjects = storageManager.loadData('projects');
storedProjects.forEach(projectData => {
    const projectFromStorage = Project.fromJSON(projectData);
    console.log(`Project Name: ${projectFromStorage.name}`);
    console.log(`Project ID: ${projectFromStorage.id}`);
    console.log(`Todos: ${Array.from(projectFromStorage.getTodos().values()).map(todo => todo.title).join(", ")}`);
});
console.log(storedProjects);

const content = document.querySelector("#content");
const card = document.createElement("div");

card.textContent = todoInstance.getProperty("title");

card.classList.add("card");

content.append(card);

load_default_page(projectManager, storageManager)