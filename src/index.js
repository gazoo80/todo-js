
//Necesario para trabajar los estilos globales
import "./styles.css";

/** Importamos las clases que vamos a necesitar desde nuectro indice de imports y exports
  * No es necesario colocar el nombre del archivo porque si lo dejamos solo con el 
  * nombre de la carpeta buscará por defecto el index.js */
import { Todo, TodoList } from "./classes";

//En este caso estamos importando una función
import { crearTodoHtml } from "./js/componentes";

//Exportamos el objeto todoList (arreglo global de tareas) para q pueda ser visto desde otros .js
export const todoList = new TodoList();

console.log(todoList.todos);

//Reconstruimos la lista de tareas en el HTML utilizando la función crearTodoHtml
todoList.todos.forEach(todo => { crearTodoHtml(todo) });



// localStorage.setItem("mi-key", "ABC123");

// sessionStorage.setItem("mi-key2", "XYZ987");

/*
setTimeout(() => {
    localStorage.removeItem("mi-key");
}, 2000);*/


