# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
- `npm run dev` - Start webpack development server with hot reloading
- `npm run build` - Build production bundle to `/dist` directory
- `npm run deploy` - Deploy to GitHub Pages using git subtree

### Project Structure
- Entry point: `src/index.js`
- HTML template: `src/template.html`
- Main stylesheet: `src/style.css`
- Output: `dist/main.js` (bundled)

## Architecture Overview

This is a modular Todo List application with clear separation between business logic and UI components.

### Core Architecture Layers

**Data Layer:**
- `Todo` class - Individual todo items with priority, due dates, completion status
- `Project` class - Container for todos with Map-based storage
- `StorageManager` - localStorage abstraction for persistence
- All classes implement `toJSON()` and `fromJSON()` for serialization

**Business Logic Layer:**
- `ProjectManager` - Manages multiple projects and current project state
- Handles loading/saving to localStorage automatically
- Tracks `isLoaded` state to prevent duplicate loading

**UI Layer:**
- `TodoUI` - Renders todos, projects, and handles user interactions
- `AddUiInputs` - Manages form inputs for creating todos/projects
- Clear separation from business logic - UI classes receive manager instances

### Key Design Patterns

**Data Management:**
- Projects contain Map of todos (keyed by ID)
- ProjectManager contains array of Projects
- UUIDs used for all entity identification (using `uuid` library)
- Automatic persistence after mutations via `saveToStorage()`

**Initialization Flow:**
1. Create manager instances
2. Load existing data from localStorage
3. Create default project if none exist
4. Initialize UI with loaded/default data

**Error Handling:**
- Validation in UI layer with user-friendly messages
- Try/catch blocks around localStorage operations
- Graceful fallbacks for missing data

## Dependencies

**Runtime:**
- `date-fns` - Date formatting and manipulation
- `uuid` - UUID generation for entity IDs

**Build Tools:**
- Webpack 5 with dev server
- CSS and HTML loaders configured
- Template uses `src/template.html`

## Data Persistence

Uses browser localStorage with JSON serialization:
- Projects stored under "projects" key
- Current project ID stored under "currentProjectId" key
- Manual debugging: Check Application > Local Storage in DevTools

## Priority System

Todo priorities defined in `todo.js`:
```javascript
export const PRIORITY = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
};
```

Visual indicators are color-coded in the UI.