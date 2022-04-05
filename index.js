


//Añadir tarea
//Creamos selector del botón y detectamos click
document.querySelector('#addTarea').addEventListener('click', (elemento)=>{
    
    //Sacamos la información del input y la guardamos el una variable
    
    var titulo = document.querySelector('#titulo').value;
    var fecha = document.querySelector('#fecha').value;
    var hora = document.querySelector('#hora').value;
    var id = titulo+fecha+hora;
    //Creamos el objeto
    nuevaTarea = {
        id: id,
        titulo: titulo,
        fecha: fecha,
        hora: hora
    }
   
    //Obtenemos la variable tareas de LocalStorage
    BDT = localStorage.getItem('tareas')
    //Si aún no hay un array en BDT inicializamos BDO como array para poder hacer el push
    if(!BDT){
        BDO = []
    }else{
    //Si ya tenemos datos los convertimos en un array
        BDO = JSON.parse(BDT)
    }
    
    BDO.push(nuevaTarea)
    BDT = JSON.stringify(BDO)
    localStorage.setItem('tareas' , BDT)
    pintarLista()
    
});

// pintarLista
//pointa la lista a partir de localstorage

const pintarLista = ()=>{
    var BDT = localStorage.getItem('tareas')
    if(!BDT){
        BDO = []
    }else{
        BDO = JSON.parse(BDT)
    }
   
    var listaHtml='<div class="list-group mt-2">'
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
                    <i data-id="${element.id}" class="editar fa-solid fa-pen-to-square ms-2"></i>
                    <i data-id="${element.id}" class="borrar fa-solid fa-trash-can ms-2"></i>
                </small>
            </div>
            <p class="mb-1">${element.fecha}</p>
            <small>${element.hora}</small>
        </a>
    `
    }); 
    listaHtml +='</div>'
    document.querySelector('#lista').innerHTML = listaHtml;
    const textArea = document.querySelector('#titulo');
    textArea.value = '';
    textArea.focus();
}

//Borrar todas las tareas

document.querySelector('#borrarTodo').addEventListener('click', ()=>{
    localStorage.clear()
    pintarLista()
});

//Borrar una tarea
document.querySelector('#lista').addEventListener('click', (UI)=>{
    
    UI.preventDefault();
    console.log(UI.target);
    if(UI.target.classList.contains('borrar')){
        console.log(UI.target.classList);
        var id = UI.target.dataset.id
        console.log(id);
        BDO = JSON.parse(localStorage.getItem('tareas'));
       
        //Tambien puedo obtener array nuevo sin el elemento borrado
        nuevoBDO = 
        //borro el dato del array
        nuevoBDO = BDO.filter(BDO => BDO.id != id)
        console.log(nuevoBDO);

        //actualizo localstorage
        localStorage.setItem('tareas', JSON.stringify(nuevoBDO))
        pintarLista()

     }
        
   
});

// Ventana modal
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
pintarLista();