import { Project } from './projects'

export class TodoUI {
  constructor (projectManager, storageManager) {
    this.projectManager = projectManager
    this.storageManager = storageManager
    this.uiElements = {
      body: document.querySelector('body'),
      content: document.getElementById('content'),
      projectSidebar: document.createElement('div'),
      projectManagerCard: document.getElementById('projects'),
      projectManagerTitle: document.createElement('h2'),
      todoList: document.createElement('div'),
      todos: document.getElementById('todos')
    }
  }

  renderProjects () {
    this.uiElements.projectManagerCard.innerHTML = ''
    const projects = this.projectManager.projects
    projects.forEach(project => {
      const projectCard = document.createElement('div')
      projectCard.classList.add('project-card')
      projectCard.textContent = project.name
      projectCard.addEventListener('click', () => {
        this.projectManager.setCurrentProject(project.id)
        this.renderTodos()
      })
      this.uiElements.projectManagerCard.appendChild(projectCard)
    })
    this.uiElements.projectManagerTitle.textContent = 'Projects'
    this.uiElements.content.appendChild(this.uiElements.projectManagerTitle)
    this.uiElements.content.appendChild(this.uiElements.projectManagerCard)
  }

  renderTodos () {
    this.uiElements.todos.innerHTML = ''
    const currentProject = this.projectManager.getCurrentProject()
    if (!currentProject) return
    const todos = currentProject.getTodos()
    const todoList = document.createElement('div')
    todoList.classList.add('todo-list')
    todos.forEach(todo => {
      const todoCard = document.createElement('div')
      todoCard.classList.add('todo-card')
      todoCard.textContent = todo.title || 'Untitled Todo'
      todoCard.addEventListener('click', () => {
        this.renderTodoDetails(todo)
      })
      todoList.appendChild(todoCard)
    })
    this.uiElements.content.appendChild(todoList)
  }

  renderTodoDetails (todo) {
    this.uiElements.todos.innerHTML = ''
    const todoDetails = document.createElement('div')
    todoDetails.classList.add('todo-details')
    todoDetails.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due Date: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Description: ${todo.description}</p>
      <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
    `
    this.uiElements.todos.appendChild(todoDetails)
  }

  renderAddTodoForm () {
    this.uiElements.todos.innerHTML = ''
    const addTodoForm = document.createElement('form')
    addTodoForm.classList.add('add-todo-form')
    const todoTitleInput = document.createElement('input')
    todoTitleInput.type = 'text'
    todoTitleInput.placeholder = 'Todo Title'
    todoTitleInput.required = true
    const todoDescriptionInput = document.createElement('input')
    todoDescriptionInput.type = 'text'
    todoDescriptionInput.placeholder = 'Todo Description'
    todoDescriptionInput.required = true
    const todoDueDateInput = document.createElement('input')
    todoDueDateInput.type = 'date'
    todoDueDateInput.required = true
    const addTodoButton = document.createElement('button')
    addTodoButton.type = 'submit'
    addTodoButton.textContent = 'Add Todo'
    addTodoForm.appendChild(todoTitleInput)
    addTodoForm.appendChild(todoDescriptionInput)
    addTodoForm.appendChild(todoDueDateInput)
    addTodoForm.appendChild(addTodoButton)
    this.uiElements.todos.appendChild(addTodoForm)
  }

  renderNewProjectForm () {
    this.uiElements.todos.innerHTML = ''
    const newProjectForm = document.createElement('form')
    newProjectForm.classList.add('new-project-form')
    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'text'
    projectNameInput.placeholder = 'Project Name'
    projectNameInput.required = true
    const createProjectButton = document.createElement('button')
    createProjectButton.type = 'submit'
    createProjectButton.textContent = 'Create Project'
    newProjectForm.appendChild(projectNameInput)
    newProjectForm.appendChild(createProjectButton)
    newProjectForm.addEventListener('submit', event => {
      event.preventDefault()
      const projectName = projectNameInput.value.trim()
      if (projectName) {
        this.projectManager.addProject(new Project({ name: projectName }))
        this.projectManager.saveToLocalStorage()
        this.renderProjects()
      }
    })
    this.uiElements.todos.appendChild(newProjectForm)
  }

  loadDefaultPage () {
    this.uiElements.content.innerHTML = ''
    this.renderProjects()
    this.renderTodos()
  }
}

export class AddButtons extends TodoUI {
  constructor (projectManager, storageManager, todo) {
    super(projectManager, storageManager)
    this.projectManager = projectManager
    this.todo = todo
    this.uiElements.todos.innerHTML = ''
    this.renderAddTodoForm()
  }
}

export class FormInputs extends TodoUI {
  constructor (projectManager, storageManager, todo) {
    super(projectManager, storageManager)
    this.projectManager = projectManager
    this.todo = todo
    this.uiElements.todos.innerHTML = ''
    this.renderAddTodoForm()
  }
  renderAddTodoButton () {
    const addButton = document.createElement('button')
    addButton.classList.add('add-button')
    this.uiElements.todos.appendChild(addButton)
    addButton.textContent = 'Add'
    addButton.addEventListener('click', () => {
      this.renderAddTodoForm()
    })
    return addButton
  }

  processTodoInput (input) {
    const todo = this.todo
    todo.title = input.title
    todo.description = input.description
    todo.dueDate = input.dueDate
    return todo
  }
  processProjectInput (input) {
    const project = this.project
    project.name = input.name
    return project
  }
}
