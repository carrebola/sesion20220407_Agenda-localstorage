
//Pintamos la lista a partir de los datos del localstorage
pintarLista();


//****************   AÑADIR TAREA ****************
//Creamos selector del botón AÑADIR TAREAS y detectamos click
document.querySelector('#addTarea').addEventListener('click', (elemento)=>{
    
    //Sacamos la información del input y la guardamos el una variable
    
    var titulo = document.querySelector('#titulo').value;
    var fecha = document.querySelector('#fecha').value;
    var hora = document.querySelector('#hora').value;
    var id = titulo+fecha+hora;
    //Creamos el objeto con los datos que hemos sacado de los inputs
    nuevaTarea = {
        id: id,
        titulo: titulo,
        fecha: fecha,
        hora: hora
    }
    crearTarea(nuevaTarea)
    pintarLista()
});

// ***************   Función pintarLista() ***********
//Captura datos del localStorage y los recorre "pintando tarjetas en pantalla", es decir los inyecta con innerHTML

function pintarLista(){
   //Capturamos datos del localStorage
    var BDT = localStorage.getItem('tareas')
    if(!BDT){
        var BDO = []
    }else{
        var BDO = JSON.parse(BDT)
    }
   //Creamos el código html con todas las fichas que hay en localStorage
    var listaHtml='<div class="list-group mt-2">'
    
    //for(lit i=0;i<BDO.length;i++){
        // BDO[i] = element
    BDO.forEach(element => {
        listaHtml+=
        `
        <a 
            href="#"
            class="list-group-item list-group-item-action flex-column align-items-start shadow-sm p-3 mb-2 bg-body rounded"
        >
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${element.titulo}</h5>
                <small>
                <!-- lapiz -->
                    <i data-id="${element.id}" class="editar fa-solid fa-pen-to-square ms-2" data-bs-toggle="modal" data-bs-target="#modalEditar"" data-titulo="${element.titulo}" data-fecha="${girarFecha(element.fecha)}" data-hora="${element.hora}"></i>
                <!-- papelera -->    
                    <i data-id="${element.id}" class="borrar fa-solid fa-trash-can ms-2"></i>   
                </small>
            </div>
            <p class="mb-1">${girarFecha(element.fecha)}</p>
            <small>${element.hora}</small>
        </a>
    `
    }); 
    listaHtml +='</div>'
    //inyectamos el código (las tarjetas) en #listas
    document.querySelector('#lista').innerHTML = listaHtml;
    
    //Seleccionamos el textarea, lo limpiamos y le ponemos el foco
    const textArea = document.querySelector('#titulo');
    textArea.value = '';
    //pone el foco en el input
    textArea.focus();
    //Actualizamos la fecha y hora con su valor actual
    actualizaFecha()
}

// ****************** TODAS LAS TAREAS ***************
//Borrar todas las tareas
//Detectamos click en botón de borrar
document.querySelector('#borrarTodo').addEventListener('click', ()=>{
    //borramos todo el localstorage
    localStorage.clear()
    //Pintamos de nuevo lo que hay (que será nada) en el localstorage
    pintarLista()
});

//************ EVENTOS PARA BORRAR y EDITAR una tarea *************
//Detectamos click sobre la lista
document.querySelector('#lista').addEventListener('click', (UI)=>{
    //Evitamos que se realice la acción del evento por defecto de las etiquetas <a>
    UI.preventDefault();
    console.log(UI.target);
    
    //**** BORRAR *****
    //Si sobre lo que hemos click tiene la clase borrar (es decir, es el icono papelera)
    if(UI.target.classList.contains('borrar')){
        //capturo el id de la tarjeta que quiero borrar
        var id = UI.target.dataset.id
        // llamo a borrar pasandole el id de la tarjeta
        borrarTarea(id)
        pintarLista()
    //EDITAR
    }else  if(UI.target.classList.contains('editar')){
        
        //Capturo los datos de los inputs
        let titulo = UI.target.dataset.titulo
        let fecha = UI.target.dataset.fecha
        let hora = UI.target.dataset.hora
        let id = UI.target.dataset.id
        //Los inserto en la ventana modal
        document.querySelector('#modal-titulo').value = titulo
        document.querySelector('#modal-fecha').value = girarFecha(fecha)
        document.querySelector('#modal-hora').value = hora
        //Meto en data-id del botón el id de la tarea
        document.querySelector('#btn-modificar').dataset.id  = id
    }
});



// Ventana modal
myModal = document.getElementById('modalEditar')

//Hacer algo cuando se detecta que se ha abierto la ventana modal
myModal.addEventListener('shown.bs.modal', function () {
 document.querySelector('#modal-titulo').focus();
})

// Detectamos click sobre la ventana modal y comprobamos si es el boton añadir evento
myModal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('modificar')){
        //capturo el id de la tarea que está guardado en el boton
        var id = e.target.dataset.id;
        //Actualizo el localstorage con la tarea modificada0
        actualizaTarea(id)
        //pinto de nuevo todas la tareas
        pintarLista()
    }
})

//girarFecha
function girarFecha(fecha){
    //fecha vale por ejemplo "2022-10-12"
    //convierte el texto fecha en un array con elementos separados por un guión (-)
    var arrayfecha = fecha.split('-')
    let anyo = arrayfecha[0];//2022
    let mes = arrayfecha[1];//10
    let dia = arrayfecha[2];//12
    //Creo un nuevo texto donde el año lo pongo al final
    fechaGirada = `${dia}-${mes}-${anyo}`
    return fechaGirada
}

//********** actualizaFecha() ********** */
//Valores por defecto en fecha y hora
function actualizaFecha(){
    //Creo un objeto fecha con la fecha y hora de hoy
    let fecha =  new Date()
    console.log(fecha); //Thu Apr 07 2022 13:06:24 GMT+0200 (hora de verano de Europa central)
    console.log(fecha.toISOString()); //2022-04-07T11:07:08.416Z
    //slice devuelve desde la posición 0 hasta la 9(10-1)
    let hoy = fecha.toISOString().slice(0,10) 
    console.log(hoy);//2022-04-07
    
    //****para la hora** */
    let horaActual = fecha.toLocaleString();
    console.log(horaActual); //7/4/2022, 13:12:19
    let ahoraSegundos = horaActual.split(',')[1] ;
    console.log(ahoraSegundos);// 13:12:19 
    let ahora = ahoraSegundos.slice(1,6); 
    console.log(ahora);//13:12
    
    //Pongo en el formulario los valores por defecto de hoy y ahora
    document.getElementById("fecha").value = hoy;
    document.getElementById("hora").value = ahora;
}


// ******Borrar Tarea ***************
// Recibe el id de la tarea que hay que borrar y la elimina del localstorage
function borrarTarea(id){
    //Capturamo sel localstorage
    var BDO = JSON.parse(localStorage.getItem('tareas'));      
    //!!!!!!!!!!
    //Obtengo un array con todos los datos menos el que no quiero
    //filter recorre el array y devuelve todos los elementos que cumplen con la condición (BDO.id != id), es decir, todos menos el que quiero eliminar.
    nuevoBDO = BDO.filter(BDO => BDO.id != id)
    //actualizo localstorage
    localStorage.setItem('tareas', JSON.stringify(nuevoBDO))
}

// ******Borrar Tarea ***************
// Recibe el id de la tarea que hay que modificar y actualiza el localstorage
function actualizaTarea(id){
    //leo el localstorage y lo parseo (convierto) en un array objeto
    BDO = JSON.parse(localStorage.getItem('tareas'))
    //Busco en el array la tarea que tiene el mismo id
    let tareaAModificar = BDO.find(BDO => BDO.id === id);
    //Busco la posición que ocupa la tarea dentro del array
    let index = BDO.indexOf(tareaAModificar);
    //Modifico ese elemento con los datos de los inputs del modal
    BDO[index].titulo = document.querySelector('#modal-titulo').value
    BDO[index].fecha= document.querySelector('#modal-fecha').value
    BDO[index].hora = document.querySelector('#modal-hora').value
    //Parseo el objeto convirtiendolo en string y lo meto en localstorage
    localStorage.setItem('tareas' , JSON.stringify(BDO))
}

/**** CrearTarea() */
//Recibe un objeto con la tarea a añadir y la agrega al localstorage
function crearTarea(nuevaTarea){

    //Si no tenemos un título que avise por alert
    if(nuevaTarea.titulo == ""){
        alert("La tarea no tiene título")
    }else{
        //Obtenemos la variable tareas de LocalStorage que es un string
    var BDT = localStorage.getItem('tareas')
    //Si aún no hay un array en BDT inicializamos BDO como array para poder hacer el push
    if(BDT == undefined){
        var BDO = []
    }else{
    //Si ya tenemos datos en localstorage los convertimos en un array/objeto
        var BDO = JSON.parse(BDT)
    }
    //Añadimos un elemento con la nueva tarea al array
    BDO.push(nuevaTarea)
    //Convertimos de nuevo el array en un string
    BDT = JSON.stringify(BDO)
    //y lo guardamos en localstorage sustituyendo el antiguo string de datos por uno nuevo con la tarea incorporada
    localStorage.setItem('tareas' , BDT)
    //Volvemos a pintar en pantalla las tarjetas con la nueva "base de datos"
    }
    
}




