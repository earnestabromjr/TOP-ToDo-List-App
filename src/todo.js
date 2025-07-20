import { userDate } from "./user";
import * as dateFns from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const PRIORITY = {
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3,
};

export class Todo {
	static instances = new Map();

	constructor({
		id = uuidv4(),
		title = "",
		dueDate = dateFns.format(new Date(), "yyyy-MM-dd"),
		priority = PRIORITY.LOW,
		description = "",
		completed = false,
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
		const d = dueDate instanceof Date ? dueDate : new Date(dueDate).toString();
		this.dueDate = add(d, {
			years: userDate.year,
			months: userDate.month,
			days: userDate.day,
		});
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

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			dueDate: dateFns.format(this.dueDate, "yyyy-MM-dd"),
			priority: this.priority,
			description: this.description,
			completed: this.completed,
		};
	}

	static fromJSON(json) {
		return new Todo({
			...json,
		});
	}
}
