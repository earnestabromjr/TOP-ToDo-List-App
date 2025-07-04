import {Todo} from "./todo";

export class Project {
    constructor({
                    name = "",
                    todoArray = []
                }) {
        this.name = name;
        this.todoArray = [];
    }

    addTodo(todo) {
        if (!this.todoArray.includes(todo)) {
            this.todoArray.push(todo);
            return this.todoArray;
        }
    }

    removeTodo(todo) {
        const index = this.todoArray.indexOf(todo);
        if (index > -1) {
            this.todoArray.splice(index, 1);
            return this.todoArray;
        }
        return null;
    }

    getTodos() {
        return this.todoArray;
    }

    getTodoById(id) {
        return this.todoArray.find(todo => todo.id === id);
    }

    toJSON() {
        return {
            name: this.name,
            todoArray: this.todoArray.map(todo => todo.toJSON())
        };
    }

    static fromJSON(json) {
        try {
            return new Project({
                name: json.name,
                todoArray: json.todoArray
                    ? json.todoArray.map(todoJson => Todo.fromJson(todoJson))
                    : []
            });
        } catch (error) {
            console.error("Failed to parse Project from JSON:", error);
            return null;
        }
    }

}