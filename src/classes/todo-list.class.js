import { Todo } from "./todo.class";

//Clase especializada para manejar todo lo referente a la lista de todo
export class TodoList {
    constructor() {
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        //Actualizamos en nuestro almacén de persistencia (localStorage)
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        //Devuelve todos los elementos del this.todos, menos el todo.id que es
        //igual al id enviado como parámetro
        this.todos = this.todos.filter(todo => todo.id != id)
        //Actualizamos en nuestro almacén de persistencia (localStorage)
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        //Recorreremos el arreglo, buscar el id y cambiar el valor de completado
        for (const todo of this.todos) {
            //Solo usar "==" porque el id en el arreglo es un entero y el que viene como
            //parámetro es un string
            if (todo.id == id) {
                todo.completado = !todo.completado;
                //Actualizamos en nuestro almacén de persistencia (localStorage)
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //Eliminar todas las tareas completadas
    eliminarCompletados() {
        //Obtenemos todas las tareas que aún no están completadas, filtrando las que ya lo están
        this.todos = this.todos.filter(todo => !todo.completado);
        //Actualizamos en nuestro almacén de persistencia (localStorage)
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        //JSON.stringify: Para guardar el arreglo como un string pues localStorage acepta solo strings
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        /* Si nuestra colección de tareas con la llave "todo" existe en el localStorage,
           cargamos su contenido en this.todos. Sino inicializamos el arreglo this.todos
           JSON.parse: Para convertir el texto en un objeto, que en este caso es un arreglo
         */
        this.todos = (localStorage.getItem("todo")) ? 
                     JSON.parse(localStorage.getItem("todo")) : [];
        
        /* Asignamos a this.todos instancias de objetos Todo a partir de la colección de objetos
           recuperados del localStorage. Para esto usamos el método estático Todo.fromJson(obj)
           map: Para barrer cada uno de los elementos de un arreglo y al final retornar un nuevo
           arreglo con cada uno de los elementos mutados.
           https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
         */
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}