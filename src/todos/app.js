import html from './app.html?raw'; 
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

//Referencias del HTML para mantener nuestros strings
const ElementIds = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId Elemento en el que vamos a renderizar la aplicación
 */

//Función que creará la aplicación - lo que queremos renderizar en pantalla
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIds.TodoList, todos );
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCountLabel);
    }

    //Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput);
    const todoListUL = document.querySelector( ElementIds.TodoList);
    const clearCompletedButton = document.querySelector( ElementIds.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll( ElementIds.TodoFilters );
    //SelectorAll porque necesitamos todos los TodoFilters, no solo uno 

    //Listeners
    //keyup: vamos a escuchar cuando la persona presiona y suelta una tecla.
    newDescriptionInput.addEventListener('keyup', (event) => {
        //El 13 es el código de la tecla enter. 
        if( event.keyCode !== 13 ) return; //Solo si es enter, se continua la función
        //El .trim quita los espacios no usados del inicio y del final 
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();
    });

    //Eliminar un todo
    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if( !element || !isDestroyElement) return;

        todoStore.deleteTodo( element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );//Vamos a eliminar de todos los elementos el class selected
            element.target.classList.add('selected');

            //Saber el valor del boton al que hacemos click
            switch(element.target.text ){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
            };
        displayTodos();
        });
    });
    
}