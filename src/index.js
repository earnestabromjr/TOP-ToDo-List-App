import "./style.css";
import { Todo } from './todo.js';

const todo = {
    id: Math.floor(Math.random() * 1000),
    title: "Learn JavaScript",
    dueDate: new Date(),
    priority: 1,
    description: "Learn JavaScript by watching the tutorial",
    completed: false
}

const todoInstance = new Todo(todo);
console.log(todo);