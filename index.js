const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const TODO_FILE = path.join(__dirname, 'todos.json');

// Helper function to read todos
const readTodos = () => {
    try {
        if (!fs.existsSync(TODO_FILE)) return [];
        const data = fs.readFileSync(TODO_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading todos:", error);
        return [];
    }
};

// Helper function to write todos
const writeTodos = (todos) => {
    try {
        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing todos:", error);
    }
};

program
    .name('filebasedtasks')
    .description('CLI To-Do List Manager')
    .version('1.0.0');

// Command to add a new todo
program
    .command('add <text>')
    .description('Add a new todo')
    .action((text) => {
        const todos = readTodos();
        if (todos.some(todo => todo === text.trim())) {
            console.log('❌ Todo already exists');
        } else {
            todos.push(text.trim());
            writeTodos(todos);
            console.log('✅ Todo added successfully');
        }
    });

// Command to delete a todo
program
    .command('delete <text>')
    .description('Delete a specific todo')
    .action((text) => {
        let todos = readTodos();
        const filteredTodos = todos.filter(todo => todo !== text.trim());
        if (filteredTodos.length === todos.length) {
            console.log('❌ Todo not found');
        } else {
            writeTodos(filteredTodos);
            console.log('🗑️ Todo deleted successfully');
        }
    });

// Command to list all todos
program
    .command('list')
    .description('List all todos')
    .action(() => {
        const todos = readTodos();
        if (todos.length === 0) {
            console.log('📭 No todos found');
        } else {
            console.log('📝 Your Todos:');
            todos.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo}`);
            });
        }
    });

// Command to mark a todo as done
program
    .command('done <text>')
    .description('Mark a todo as done')
    .action((text) => {
        let todos = readTodos();
        let isFound = false;
        todos = todos.map(todo => {
            if (todo === text.trim()) {
                isFound = true;
                return `✅ ${todo}`;
            }
            return todo;
        });

        if (isFound) {
            writeTodos(todos);
            console.log('✔️ Todo marked as done');
        } else {
            console.log('❌ Todo not found');
        }
    });

// Command to undo a completed todo
program
    .command('undo-done <text>')
    .description('Unmark a completed todo')
    .action((text) => {
        let todos = readTodos();
        let isFound = false;
        todos = todos.map(todo => {
            if (todo === `✅ ${text.trim()}`) {
                isFound = true;
                return text.trim();
            }
            return todo;
        });

        if (isFound) {
            writeTodos(todos);
            console.log('🔄 Todo undone successfully');
        } else {
            console.log('❌ Todo not found or not marked as done');
        }
    });

// Command to remove all completed todos
program
    .command('remove-done')
    .description('Remove all completed todos')
    .action(() => {
        let todos = readTodos();
        const filteredTodos = todos.filter(todo => !todo.startsWith('✅ '));

        if (filteredTodos.length === todos.length) {
            console.log('⚠️ No completed todos found');
        } else {
            writeTodos(filteredTodos);
            console.log('🧹 Completed todos removed successfully');
        }
    });

// Command to clear all todos
program
    .command('clear')
    .description('Remove all todos')
    .action(() => {
        writeTodos([]);
        console.log('🚀 All todos cleared successfully');
    });

const addTodosInBulk = (todos) => {
    try {
        const todosList = fs.existsSync('todos.json') ? fs.readFileSync('todos.json', 'utf-8') : '[]';
        const parsedTodos = JSON.parse(todosList);
        let newTodos = [];

        todos.forEach(todo => {
            if (!parsedTodos.includes(todo.trim())) {
                newTodos.push(todo.trim());
            }
        });

        if (newTodos.length === 0) {
            console.log('All provided todos already exist.');
            return;
        }

        fs.writeFileSync('todos.json', JSON.stringify([...parsedTodos, ...newTodos], null, 2), 'utf-8');
        console.log('Todos added successfully');
    } catch (error) {
        console.error('Error adding todos:', error);
    }
};
// Command to search for todos
program
    .command('search <keyword>')
    .description('Search for todos containing a keyword')
    .action((keyword) => {
        const todos = readTodos();
        const results = todos.filter(todo => todo.toLowerCase().includes(keyword.toLowerCase()));

        if (results.length === 0) {
            console.log(`🔍 No todos found containing "${keyword}"`);
        } else {
            console.log(`🔎 Found ${results.length} todos:`);
            results.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo}`);
            });
        }
    });

program
    .command('addBulk <todos...>')
    .description('Add multiple todos at once')
    .action(addTodosInBulk);



program.parse(process.argv);
