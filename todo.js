todo = {
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

    setDueDate(dueDate) {
        this.dueDate = new Date();
    }

    setPriority(priority) {
        this.priority = priority;
    }
}