import html from './app.html?raw';
import todoStore from '../store/todo.store'
import { renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput : '#new-todo-input'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
     }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    //HTML references
    const newDesciptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const itemUl = document.querySelector( ElementIDs.TodoList );

    //Listeners
    newDesciptionInput.addEventListener( 'keyup', (event) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;
        
        todoStore.addTodo ( event.target.value );
        displayTodos();

        event.target.value = ''
    });

    itemUl.addEventListener( 'click', (event) => {
        const item =  event.target.closest('[data-id]');
        todoStore.toggleTodo( item.getAttribute('data-id'));
        displayTodos()
    });

}