import {userDate} from "./user";
import {add} from "date-fns";

export const PRIORITY = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
}

export class Todo {
    static instances = new Map();

    constructor({
                    id = Date.now().toString(),
                    title = "",
                    dueDate = Date.now(),
                    priority = PRIORITY.LOW,
                    description = "",
                    completed = false
                }) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.completed = completed;
        this.id = id;
    }

    static addTodo(todo) {
        if (!(todo instanceof Todo)) {
            todo = new Todo(todo);
        }
        this.instances.set(todo.id, todo);
        return todo;
    }

    static get(id) {
        return this.instances.get(id);
    }

    setDueDate(dueDate) {
        if (!dueDate) {
            this.dueDate = null;
            return;
        }
        const d = dueDate instanceof Date ? dueDate : new Date(dueDate);
        this.dueDate = add(d, {
            years: userDate.year,
            months: userDate.month,
            days: userDate.day
        })
    }

    setProperty(property, value) {
        this[property] = value;
    }

    getProperty(property) {
        if (property === "dueDate") {
            return this.dueDate?.toString();
        }
        return this[property];
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            dueDate: this.dueDate?.toString(),
            priority: this.priority,
            description: this.description,
            completed: this.completed
        }
    }

    static fromJson(json) {
        return new Todo({
            ...json,
            dueDate: json.dueDate ? new Date(json.dueDate) : null
        });
    }
}