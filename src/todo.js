import {userDate} from "./user";

const todo = {
    id: "",
    title: "",
    dueDate: null,
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
        this.id = todo.id;
    }
    todoInstances = [];

    addTodo(todo) {
        if (todo.id in this.todoInstances) {
            return;
        }
        this.todoInstances[todo.id] = todo;
        return todo;
    }

    setDueDate(dueDate) {
        this.dueDate = new Date();
        this.dueDate.setDate(dueDate.getDate() + userDate.day);
        this.dueDate.setMonth(dueDate.getMonth() + userDate.month);
        this.dueDate.setFullYear(dueDate.getFullYear() + userDate.year);
    }

    setProperty(property, value) {
        this[property] = value;
    }

    getProperty(property) {
        return this[property];
    }

    toJson() {

    }

    static fromJson(json) {

    }
}