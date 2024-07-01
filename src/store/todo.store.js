//!Lugar donde colocamos toda la información que es relevante para nuestra aplicación
//!y donde vamos a tener de manera global nuestros datos

import { Todo } from "../todos/models/todo.model";

//En mayúscula para indicar que va a ser una enumeración.
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

//Definir cómo va a lucir el estado global de la aplicación
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la realidad'),
    ],
    filter: Filters.All,//Por defecto, el filtro estará en All
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return; //Verificar

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state) );
    //El JSON.stringify es una función del método JSON que va a serializar con un string lo que indiquemos entre ()
}

//En base a los 3 tipos de filtros...
const getTodos = ( filter = Filters.All) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos]; //Devuelve cada elemento del array dentro de state

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option ${ filter } is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if( !description ) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * Para saber si el todo está terminado o pendiente (true o false)
 * @param {String} todoId Todo identifier
 */
const toggleTodo = ( todoId ) => {
//El .map permite regresar los nuevos valores que va a tener cada uno de los elementos de ese arreglo
//Regresa un nuevo arreglo
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

//Exponer únicamente lo que queremos que sea público
export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}