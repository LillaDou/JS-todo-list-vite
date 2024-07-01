//!Módulo donde indicamos cómo va a lucir nuestro To Do

import { v4 as uuid } from 'uuid';

//Creamos en class en vez de const para poder crear instancias del TODO.
export class Todo {
    
    /**
     * 
     * @param {String} description Descripción de las tareas del To Do
     */
    constructor( description ){
        this.id = uuid(); //ID personal/único de cada elemento
        this.description = description;
        this.done = false; //Falso porque por defecto no está la tarea realizada
        this.createdAt = new Date();
    }

}