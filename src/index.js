import "./style.css";
import { Todo } from './todo.js';
import { Project } from "./projects";
import { ProjectManager } from "./projectManager";
import { StorageManager } from "./storageManager";

const todo = {
    title: "Learn JavaScript",
    dueDate: Date.now(),
    priority: 1,
    description: "Learn JavaScript by watching the tutorial",
    completed: false
}

const todoInstance = new Todo(todo);
console.log(todoInstance.getProperty("completed"));
todoInstance.setProperty("completed", true);
console.log(todoInstance.getProperty("completed"));

const content = document.querySelector("#content");
const card = document.createElement("div");

card.textContent = todoInstance.getProperty("title");

card.classList.add("card");

content.append(card);