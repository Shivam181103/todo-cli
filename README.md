# File-Based To-Do List Manager

## Overview
This is a simple and efficient command-line To-Do List Manager built with Node.js. It helps you keep track of tasks with an easy-to-use interface. Tasks are stored in a local `todos.json` file, making it lightweight and file-based.

## Features
- ✅ Add single or multiple todos
- 🗑️ Delete specific todos
- 📋 List all todos
- ✔️ Mark todos as done
- 🔄 Undo completed todos
- 🧹 Remove all completed todos
- 🚀 Clear all todos
- 🔎 Search for todos
- 📦 Bulk add multiple todos

## Installation
Make sure you have Node.js installed, then clone this repository and navigate to the project folder.

```sh
npm install
```

## Usage
Run commands using:

```sh
node index.js <command> [options]
```

### Commands

#### 1️⃣ Add a New Todo
```sh
node index.js add "Buy groceries"
```
✅ Adds a new todo.

#### 2️⃣ Add Multiple Todos in Bulk
```sh
node index.js addBulk "Finish report" "Call mom" "Book flight tickets"
```
📦 Adds multiple todos at once.

#### 3️⃣ List All Todos
```sh
node index.js list
```
📋 Displays all your todos.

#### 4️⃣ Delete a Specific Todo
```sh
node index.js delete "Call mom"
```
🗑️ Removes the given todo.

#### 5️⃣ Mark a Todo as Done
```sh
node index.js done "Buy groceries"
```
✔️ Marks a todo as completed.

#### 6️⃣ Undo a Completed Todo
```sh
node index.js undo-done "Buy groceries"
```
🔄 Unmarks a completed todo.

#### 7️⃣ Remove All Completed Todos
```sh
node index.js remove-done
```
🧹 Clears only completed todos.

#### 8️⃣ Clear All Todos
```sh
node index.js clear
```
🚀 Deletes all todos.

#### 9️⃣ Search for a Todo
```sh
node index.js search "groceries"
```
🔎 Finds todos that match the keyword.

## Example Workflow
```sh
node index.js add "Go for a run"
node index.js add "Read a book"
node index.js done "Go for a run"
node index.js list
```
Expected output:
```
📝 Your Todos:
1. ✅ Go for a run
2. Read a book
```

## Notes
- Tasks are saved in `todos.json` automatically.
- Completed tasks are marked with a ✅.
- Commands are case-insensitive but must match exactly.
- Todos are stored as plain text, so no fancy features like due dates (yet 😉).
 
