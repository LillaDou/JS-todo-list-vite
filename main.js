import './style.css'
import { App } from './src/todos/app';
import todoStore from './src/store/todo.store';


todoStore.initStore();

//Aquí es donde queremos renderizar nuestra aplicación (en el HTML, en el #app)
App('#app');

