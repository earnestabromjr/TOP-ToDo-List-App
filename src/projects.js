import {Todo} from "./todo";

export class Project {
    constructor({
                    name = "",
                    todos = new Map(),
                }) {
        this.name = name;
        this.todos = todos;
    }
    addName(name) {
        if (name && typeof name === "string") {
            this.name = name;
            return this.name;
        }
        return null;
    }

    addTodo(todo) {
        if (!this.todos.has(name)) {
            this.todos.set(todo.id, todo);
            return this.todos;
        }
    }


    removeTodo(todo) {
       if (this.todos.size === 0) {
           return this.todos;
       }
       this.todos.delete(todo.id);
    }

    getTodos() {
        return this.todos;
    }

    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    toJSON() {
        return {
            name: this.name,
            todos: this.todos.map(todo => todo.toJSON())
        };
    }

    static fromJSON(json) {
        try {
            return new Project({
                name: json.name,
                todos: json.todos
                    ? json.todos.map(todoJson => Todo.fromJson(todoJson))
                    : []
            });
        } catch (error) {
            console.error("Failed to parse Project from JSON:", error);
            return null;
        }
    }

}