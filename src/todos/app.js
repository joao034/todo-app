import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderPendingTodos, renderTodos } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel : '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendingTodos( ElementIDs.PendingCountLabel );
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //HTML references
    const newDesciptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const itemUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners
    newDesciptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = ''
    });

    itemUl.addEventListener('click', (event) => {
        const item = event.target.closest('[data-id]');
        todoStore.toggleTodo(item.getAttribute('data-id'));
        displayTodos();
    });

    itemUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteTodosCompleted();
        displayTodos();
    });

    filtersLi.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLi.forEach(elm => elm.classList.remove('selected'))
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setSelectedFilter(Filters.All);
                    break;

                case 'Pendientes':
                    todoStore.setSelectedFilter(Filters.Pending);
                    break;

                case 'Completados':
                    todoStore.setSelectedFilter(Filters.Completed);
                    break;

            }

            displayTodos();
        });


        

    })

}