import {userDate} from "./user";

const todo = {
    title: "",
    dueDate: Date(),
    priority: 0,
    description: "",
    completed: false
}

export class Todo {
    constructor(todo) {
        this.title = todo.title;
        this.dueDate = todo.dueDate;
        this.priority = todo.priority;
        this.description = todo.description;
        this.completed = todo.completed;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate,date) {
        this.dueDate = new Date();
        this.dueDate.setDate(dueDate.getDate() + userDate.day);
        this.dueDate.setMonth(dueDate.getMonth() + userDate.month);
        this.dueDate.setFullYear(dueDate.getFullYear() + userDate.year);
    }

    setPriority(priority) {
        this.priority = priority;
    }
}