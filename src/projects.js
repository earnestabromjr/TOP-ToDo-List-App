import { Todo } from "./todo";

export class Project {
	constructor({ name = "", todos = new Map(), id = undefined }) {
		this.name = name;
		this.todos = todos;
		this.id = id || crypto.randomUUID();
	}
	addName(name) {
		if (name && typeof name === "string") {
			this.name = name;
			return this.name;
		}
		return null;
	}

	addTodo(todo) {
		if (!this.todos.has(this.name)) {
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
		let todosArray = [];
		for (const todo of this.todos.values()) {
			todosArray.push(todo);
		}
		return todosArray;
	}

	getTodoById(id) {
		let todosArray = this.getTodos();
		if (todosArray.length === 0) {
			return null;
		}
		const todo = todosArray.find((todo) => todo.id === id);
		if (todo) {
			return todo;
		}
	}

	toJSON() {
		return {
			name: this.name,
			id: this.id,
			todos: Array.from(this.todos.values()).map((todo) => todo.toJSON()),
		};
	}

	static fromJSON(json) {
		const todosMap = new Map();
		if (Array.isArray(json.todos)) {
			json.todos.forEach((todoJson) => {
				const todo = Todo.fromJSON(todoJson);
				todosMap.set(todo.id, todo);
			});
		}
		return new Project({
			name: json.name,
			id: json.id,
			todos: todosMap,
		});
	}
}
