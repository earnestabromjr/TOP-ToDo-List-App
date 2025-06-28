# ToDo List App

## Project Overview
This is a ToDo List application that allows users to manage their tasks across different projects. The application is built with a focus on clean architecture, separating application logic from the DOM manipulation.

## Features

### Core Functionality
- **Todo Items**: Each todo is an object with the following properties:
  - Title
  - Description
  - Due date
  - Priority level
  - (Optional) Notes
  - (Optional) Checklist items

### Project Management
- Default project for new todos
- Ability to create multiple projects
- Organize todos within different projects

### User Interface
- View all projects
- View todos within each project (showing title and due date)
- Visual priority indicators (color-coded)
- Expand todo items to view/edit details
- Delete todos

## Technical Requirements

### Architecture
- Separation of concerns:
  - Application logic (todo/project management)
  - DOM manipulation (UI updates)

### Data Persistence
- Uses Web Storage API (`localStorage`) to save:
  - Projects
  - Todos within projects
- Data persists between page refreshes
- Graceful handling of missing data

### Development Tools
- Webpack for module bundling
- npm for package management

## Recommended Libraries
- **date-fns**: For date formatting and manipulation

## Development Tips

### localStorage Usage
1. Data is stored in the browser's localStorage
2. View stored data in DevTools:
   - Open Application tab
   - Navigate to Local Storage under Storage

### Important Notes
- localStorage is specific to each device/browser
- Data is stored as JSON (no functions can be stored)
- Implement methods to reconstruct objects when retrieving from storage

## Inspiration
Check out these popular todo apps for UI/UX ideas:
- [Todoist](https://todoist.com/)
- [Things](https://culturedcode.com/things/)
- [any.do](https://www.any.do/)

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

Happy coding! 🚀