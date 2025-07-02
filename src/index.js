import "./style.css";
import { Todo } from './todo.js';

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