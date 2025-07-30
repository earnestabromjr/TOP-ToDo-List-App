import { Todo } from "./todo";

export class Project {
	constructor({ name = "", todos = new Map(), id = undefined }) {
		this.name = name;
		this.todos = todos;
		this.id = id || crypto.randomUUID();
	}
	setName(name) {
		if (!name || typeof name !== "string") {
			throw new Error("name must be of type string ");
		}
		this.name = name;
		return this;
	}

	addTodo(todo) {
		if (!(todo instanceof Todo)) {
			throw new Error("Must provide a valid Todo instance");
		}
		if (this.todos.has(this.id)) {
			throw new Error(`Todo with id ${todo.id} already exists`);
		}
		this.todos.set(todo.id, todo);
		return this;
	}

	removeTodo(todoId) {
		if (!this.todos.has(todoId)) {
			throw new Error(`Todo with id ${todoId} not found`);
		}
		this.todos.delete(todoId);
		return this;
	}

	getTodos() {
		const todosArray = [];
		if (this.todos.size === 0) {
			return todosArray; // Return empty array if no todos
		}
		for (const todo of this.todos.values()) {
			todosArray.push(todo);
		}
		return todosArray;
	}

	getTodoById(id) {
		const todosArray = this.getTodos();
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
