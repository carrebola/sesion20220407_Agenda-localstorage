//Valores por defecto en fecha y hora
function actualizaFecha(){
    var fecha =  new Date()
    console.log(fecha.toISOString());
    var hoy = fecha.toISOString().slice(0,10)

    console.log(hoy);
    var ahora = fecha.toLocaleString().split(',')[1].slice(1,6)
    console.log(ahora);

    let hora = fecha.getHours();
    let minutos =  fecha.getMinutes();
    let segundos = fecha.getSeconds();
    document.getElementById("fecha").value = hoy
    document.getElementById("hora").value = ahora
}




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
                    <i data-id="${element.id}" class="editar fa-solid fa-pen-to-square ms-2" data-bs-toggle="modal" data-bs-target="#modalEditar"" data-titulo="${element.titulo}" data-fecha="${girarFecha(element.fecha)}" data-hora="${element.hora}"></i>
                    <i data-id="${element.id}" class="borrar fa-solid fa-trash-can ms-2"></i>
                   
                </small>
            </div>
            <p class="mb-1">${girarFecha(element.fecha)}</p>
            <small>${element.hora}</small>
        </a>
    `
    }); 
    listaHtml +='</div>'
    document.querySelector('#lista').innerHTML = listaHtml;
    const textArea = document.querySelector('#titulo');
    textArea.value = '';
    textArea.focus();
    actualizaFecha()
}

//Borrar todas las tareas

document.querySelector('#borrarTodo').addEventListener('click', ()=>{
    localStorage.clear()
    pintarLista()
});

//Borrar y editar una tarea
document.querySelector('#lista').addEventListener('click', (UI)=>{
    
    UI.preventDefault();
    console.log(UI.target);
    //BORRAR
    if(UI.target.classList.contains('borrar')){
        var id = UI.target.dataset.id
        BDO = JSON.parse(localStorage.getItem('tareas'));    
       
        //Obtengo un array con todos los datos menos el que no quiero
        nuevoBDO = BDO.filter(BDO => BDO.id != id)
        //actualizo localstorage
        localStorage.setItem('tareas', JSON.stringify(nuevoBDO))
        pintarLista()
    //EDITAR
    }else  if(UI.target.classList.contains('editar')){
        let titulo = UI.target.dataset.titulo
        let fecha = UI.target.dataset.fecha
        let hora = UI.target.dataset.hora
        let id = UI.target.dataset.id

        document.querySelector('#modal-titulo').value = titulo
        document.querySelector('#modal-fecha').value = girarFecha(fecha)
        document.querySelector('#modal-hora').value = hora
        document.querySelector('#btn-modificar').dataset.id  = id
    }
});

//girarFecha
function girarFecha(fecha){
    var fechaA = fecha.split('-')
    fechaGirada = `${fechaA[2]}-${fechaA[1]}-${fechaA[0]}`
    return fechaGirada
}

// Ventana modal
myModal = document.getElementById('modalEditar')
//var myInput = document.getElementById('#myInput')

myModal.addEventListener('shown.bs.modal', function () {
  //myInput.focus()
  console.log('modal!!!');
})
myModal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('modificar')){
        console.log('click en modal');
        BDO = JSON.parse(localStorage.getItem('tareas'))
        let index = BDO.indexOf(BDO.find(BDO=>BDO.id === e.target.dataset.id))
    
        BDO[index].titulo =  document.querySelector('#modal-titulo').value
        
        BDO[index].fecha= document.querySelector        
        ('#modal-fecha').value

        BDO[index].hora = document.querySelector('#modal-hora').value = '00:00'
        
        localStorage.setItem('tareas' , JSON.stringify(BDO))
        console.log(myModal)
        pintarLista()
    }
})



pintarLista();
