import {Todo} from "./todo";

export class Project {
    constructor({
                    name = "",
                    projectArray = []
                }) {
        this.name = name;
        this.projectArray = [];
    }

    addTodo(todo) {
        if (!this.projectArray.includes(todo)) {
            this.projectArray.push(todo);
            return this.projectArray;
        }
    }

    removeTodo(todo) {
        const index = this.projectArray.indexOf(todo);
        if (index > -1) {
            this.projectArray.splice(index, 1);
            return this.projectArray;
        }
        return null;
    }

    getTodos() {
        return this.projectArray;
    }

    getTodoById(id) {
        return this.projectArray.find(todo => todo.id === id);
    }

    toJSON() {
        return {
            name: this.name,
            projectArray: this.projectArray.map(todo => todo.toJSON())
        };
    }

    static fromJSON(json) {
        try {
            return new Project({
                name: json.name,
                projectArray: json.projectArray
                    ? json.projectArray.map(todoJson => Todo.fromJson(todoJson))
                    : []
            });
        } catch (error) {
            console.error("Failed to parse Project from JSON:", error);
            return null;
        }
    }

}