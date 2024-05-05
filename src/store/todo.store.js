import { Todo } from "../todos/models/todo.model";

const Filters = {
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
    console.log(state)
    console.log('Init Store')
}

const loadStore = () => {
    throw new Error('not implemented');
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
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map ( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done 
        }
        return todo;
    })
}

const deleteTodo = (todoId) => {
    return state.todos.filter( todo => todo.id !== todoId)
}

const deleteTodosCompleted = () => {
    return state.todos.filter ( todo => todo.done )
}

const setSelectedFilter = (newFilter = Filters.All) => {
    if(!Object.keys(Filters).includes( newFilter )) throw new Error ('Filter not valid');
    state.filter = newFilter;
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