const { Command } = require('commander');
const fs = require('fs');
const program = new Command()

program
    .name('filebasedtasks')
    .description('File Based Tasks')
    .version('0.0.1')

program
    .option('-a, --add <text>', 'Add a todo')
    .option('-d, --delete <text>', 'Delete a todo')
    .option('-l, --list', 'List all todos')
    .option('-c, --done <text>', 'Mark a todo as done')
    .option('-t, --removeDone', 'Remove which is done')
    .action((options) => {
        if (options.add) addTodo(options.add)
        else if (options.delete) deleteTodo(options.delete)
        else if (options.list) getAllTodos()
        else if (options.done) markTodoAsDone(options.done)
        else if (options.removeDone) removeDone()

    })

const removeDone = () => {
    try {
        const todosList = fs.readFileSync('todos.json', 'utf-8');
        const parsedTodos = JSON.parse(todosList);
        const filteredTodos = parsedTodos.filter(todo => !/^--Done--.*--Done--$/.test(todo));
        if (filteredTodos.length === parsedTodos.length) {
            console.log('No Completed Todo found');
            return;
        } 
        fs.writeFileSync('todos.json', JSON.stringify(filteredTodos), 'utf-8');
        console.log('Completed todo removed successfully');

    } catch (erorr) {
        console.error(erorr)
    }
}
const addTodo = (text) => {
    const todosList = fs.readFileSync('todos.json', 'utf-8');
    const parsedTodos = JSON.parse(todosList);
    if (parsedTodos.findIndex(todo => todo == text.trim()) === -1) {
        try {
            fs.writeFileSync('todos.json', JSON.stringify([...parsedTodos, text]), 'utf-8');
            console.log('Todo added successfully');
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('Todo already exists');
    }
}

const deleteTodo = (text) => {
    const todosList = fs.readFileSync('todos.json', 'utf-8');
    const parsedTodos = JSON.parse(todosList);
    const filteredTodos = parsedTodos.filter(todo => todo !== text.trim());
    if (filteredTodos.length === parsedTodos.length) {
        console.log('Todo not found');
        return;
    }
    try {
        fs.writeFileSync('todos.json', JSON.stringify(filteredTodos), 'utf-8');
        console.log('Todo deleted successfully');
    } catch (error) {
        console.log(error);
    }
}

const getAllTodos = () => {
    const todosList = fs.readFileSync('todos.json', 'utf-8');
    const parsedTodos = JSON.parse(todosList);
    console.log(parsedTodos);
}

const markTodoAsDone = (text) => {
    const todosList = fs.readFileSync('todos.json', 'utf-8');
    const parsedTodos = JSON.parse(todosList);
    let isFound = false
    const filteredTodos = parsedTodos.map(todo => {
        if (todo == text.trim()) {
            console.log("Todo Marked as Done");
            isFound = true
            return `--Done--${todo}--Done--`
        }
        return todo;
    });
    if (!isFound) {
        console.log('Todo not found');
        return;
    }
    try {
        fs.writeFileSync('todos.json', JSON.stringify(filteredTodos), 'utf-8');
    } catch (error) {
        console.log(error);
    }
}

program.parse(process.argv)

module.exports = program