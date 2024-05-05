import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state =
{
    todos: [
        new Todo('Todo 1'),
        new Todo('Todo 2'),
        new Todo('Todo 3'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log('Init Store')
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return;

    const { todos = [] , filter = Filters.All} = JSON.parse( localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveOnLocaleStorage = () => {
    localStorage.setItem('state', JSON.stringify( state ));
}

const getTodos = ( filter = Filters.All ) => {
    switch ( filter ){
        case Filters.All:  
            return [...state.todos];
        case Filters.Completed: 
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter ( todo => !todo.done );
        default: 
            throw new Error `Option ${filter} not valid!`;
    }
}

const addTodo = (description) => {
    if( !description ) throw Error('Description is required');
    state.todos.push( new Todo( description ) );

    saveOnLocaleStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map ( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done 
        }
        return todo;
    })

    saveOnLocaleStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( (todo) => todo.id !== todoId );
    saveOnLocaleStorage();
}

const deleteTodosCompleted = () => {
    state.todos = state.todos.filter ( todo => !todo.done );
    saveOnLocaleStorage();
}

const setSelectedFilter = (newFilter = Filters.All) => {
    if(!Object.keys(Filters).includes( newFilter )) throw new Error ('Filter not valid');
    state.filter = newFilter;
    saveOnLocaleStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteTodosCompleted,
    setSelectedFilter,
    getCurrentFilter,
}