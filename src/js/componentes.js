//Importamos la clase
import { todoList } from ".."; //Por defecto busca index.js en src
import { Todo } from "../classes";

//Referencias en el HTML
const divTodoList = document.querySelector(".todo-list"); //En realidad es un <ul>
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li ${(todo.completado)? "class='completed'" : ""} data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)? "checked" : ""}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    //Colocamos div.firstElementChild() para añadir a la lista <ul> no un <div> sino el
    //un elemento <li> que es el primer y único elemento del <div>
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

//Eventos
txtInput.addEventListener("keyup", (event) => {
    //console.log(event);
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        //Creamos un nuevo todo con lo ingresado
        const nuevoTodo = new Todo(txtInput.value);
        //Añadimos el nuevo todo a la lista de todo
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);
        //Creamos el html correspondiente al nuevo todo
        crearTodoHtml(nuevoTodo);
        //Borramos el input de ingreso
        txtInput.value = "";
    }
});

divTodoList.addEventListener("click", (event) => {
    console.log("click");
    console.log(event.target.localName);

    //event.target: Obtenemos el elemento dentro del <li> de la lista de tareas en el hicimos clic
    //event.target.localName : Obtenemos el nombre del elemento
    const nombreElemento = event.target.localName; //input, label o button

    //Obtenemos el elemento <li> en el que ocurrió el evento
    //<li><div><input><label><button></div></li>
    const todoElemento = event.target.parentElement.parentElement;

    //Obtenemos el id de la tarea, almacenado en el atributo data-id del <li>
    const todoId = todoElemento.getAttribute("data-id");

    if (nombreElemento.includes("input")) { //Si se hizo clic en el checkbox
        todoList.marcarCompletado(todoId);
        //classList: Hace referncia a las clases del elemento
        //toggle: Para quitarle una clase si existe. O ponerla si no existe 
        todoElemento.classList.toggle("completed");
    }
    else if (nombreElemento.includes("button")) { //Si se hizo clic en el button
        //Borramos la tarea del arreglo todoList
        todoList.eliminarTodo(todoId);
        //Borramos la tarea de la lista de tareas en el HTML
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
});

//Manejador de la opción Borrar completas
btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();

    //Borramos las tareas de la lista de tareas en el HTML
    for(let i=divTodoList.children.length-1; i >= 0; i--) {
        //Obtenemos los elementos (de atrás hacia adelante) de la lista de tareas
        //divTodoList : Es en realidad un <ul>
        //divTodoList.children[i] : Obtiene el primer hijo <li>
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains("completed")) { 
            //Si el elemento <li> tiene la clase "completed" lo removemos del <ul> 
            divTodoList.removeChild(elemento);
        }
    }
});

//Manejador de Filtros (Todas, Pendientes y Completadas)
ulFiltros.addEventListener("click", (event) => {
    console.log(event.target.text);

    //Si hacemos clic fuera de las opciones event.target.text nos da undefined
    const filtro = event.target.text;

    //Si filtro es undefined (false), al negarlo entra al if y ejecuta return
    if (!filtro) { return; }

    //Removemos la clase selected de todos los filtros
    anchorFiltros.forEach(filtro => filtro.classList.remove("selected"));

    //Ahora le ponemos la clase selected solo al filtro seleccionado
    //event.target nos devuelve un <a>
    event.target.classList.add("selected");

    //Recorremos la colección de elementos de la <ul>
    for (const elemento of divTodoList.children) {
        //Esto nos ayudará a que se muestren todas las tareas cuando hagamos clic en Todas
        elemento.classList.remove("hidden");

        //Preguntamos si la tarea está completada atravez de la clase completed
        const completado = elemento.classList.contains("completed");

        //Evaluamos el filtro
        switch (filtro) {
            case "Pendientes": //Si el filtro es Pendientes
                if (completado) {  //Si la tarea esta completada
                    elemento.classList.add("hidden"); //Ocultamos el elemento
                }
                break;

            case "Completadas": //Si el filtro es Completadas
                if (!completado) {  //Si la tarea no está completada
                    elemento.classList.add("hidden"); //Ocultamos el elemento
                }
                break;
        }
    }

});