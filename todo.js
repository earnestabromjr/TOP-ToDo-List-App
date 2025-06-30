const todo = {
    title: "",
    dueDate: Date(),
    priority: 0,
    description: "",
    completed: false
}

const date = {
    day: 0,
    month: 0,
    year: 0
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
        this.dueDate.setDate(dueDate.getDate() + date.day);
        this.dueDate.setMonth(dueDate.getMonth() + date.month);
        this.dueDate.setFullYear(dueDate.getFullYear() + date.year);
    }

    setPriority(priority) {
        this.priority = priority;
    }
}