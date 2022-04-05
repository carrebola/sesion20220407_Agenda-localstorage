//Creamos el array ejemplo para guardar en localStorage
BDO=[
    {
        titulo: "correr 5 km",
        fecha: "12/12/2020",
        hora: "18:00"
    },
    {
        titulo: "Andar 5 km",
        fecha: "14/12/2020",
        hora: "19:00"
    }
]

//Convertimos el array en un texto
BDT = JSON.stringify(BDO)
//Lo metemos en localStorage
localStorage.setItem('tareas' , BDT)
console.log(localStorage);