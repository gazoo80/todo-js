
//Como esta clase será utilizada fuera de este archivo, utilizamos export
export class Todo {

    /* Método estático para reconstruir como objetos Todo los objetos sin tipo que traemos
       del LocalStorage cuando cargamos las tareas ya existentes.
       Para esto utilizamos la desestructuración de objetos. Al final retornamos un objeto Todo
    */
    static fromJson ({id, tarea, completado, creado}) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}