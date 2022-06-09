" use strict"

document.addEventListener("DOMContentLoaded", ()=>{
    
    /*MENU DESPLEGABLE*/
    function toggleMenu() {
    document.querySelector(".nav-group").classList.toggle("show");
    }
    document.querySelector(".btn-menu").addEventListener("click", toggleMenu);
    /*MENU DESPLEGABLE*/

    /*TABLA DINAMICA*/

    let tabla = document.querySelector("#tabla_dinamica");

    let jsonCarreras = [{
    distancia: "5",
    tiempoEstimado: "30 min",
    record: "22 min",
    premios: " 10.000"
    },
    {
    distancia: "10",
    tiempoEstimado: "40 min",
    record: "30 min",
    premios: "25.000",
    },  
    {
    distancia: "21",
    tiempoEstimado: "90",
    record: "84",
    premios: "100.000",
    },
    {
    distancia: "42",
    tiempoEstimado: "180 min",
    record: "172",
    premios: "250.000",
    }
    ]

mostrarTabla();

    function mostrarTabla () {
        tabla.innerHTML = '';  //vacio la tabla, para no cargar multiples veces la misma data

        for(let i = 0; i<jsonCarreras.length; i++){
          if(jsonCarreras[i].distancia > 40){
            tabla.innerHTML += 
                `<tr class="filaResaltada">
                <td class="celdas">
                  <b>${jsonCarreras[i].distancia} Km</b>
                </td>
                <td class="celdas">
                  <b>${jsonCarreras[i].tiempoEstimado}</b>
                </td>
                <td class="celdas">
                  <b> ${jsonCarreras[i].record} </b>
                </td>
                <td class="celdas">
                  <b> ${jsonCarreras[i].premios} </b>
                </td>
              </tr>
              `
          }else{
            tabla.innerHTML += 
                `<tr>
                <td class="celdas">
                  <b>${jsonCarreras[i].distancia} Km</b>
                </td>
                <td class="celdas">
                  <b>${jsonCarreras[i].tiempoEstimado}</b>
                </td>
                <td class="celdas">
                  <b> ${jsonCarreras[i].record} </b>
                </td>
                <td class="celdas">
                  <b> ${jsonCarreras[i].premios} </b>
                </td>
              </tr>
              `
          }
        }
        
        }

    let buttonAgregar = document.querySelector ("#buttonAgregar");
    buttonAgregar.addEventListener("click", agregar);
    
    function agregar(e){
        e.preventDefault();
        let inputDistancia = document.querySelector ("#input_Distancia").value;
        let inputTiempo = document.querySelector ("#input_Tiempo").value;
        let inputRecord = document.querySelector ("#input_Record").value;
        let inputPremios = document.querySelector ("#input_Premios").value;

        let nueva_carrera = {
            distancia: inputDistancia,
            tiempoEstimado: inputTiempo,
            record: inputRecord,
            premios: inputPremios
        }

        jsonCarreras.push(nueva_carrera);
        mostrarTabla();
    }

    let buttonBorrar = document.querySelector ("#buttonBorrar");
    buttonBorrar.addEventListener("click", borrarTodo);

    function borrarTodo() {
        jsonCarreras = [];
        mostrarTabla();
    }

    
    let buttonBorrarUltimo = document.querySelector("#buttonBorrar_ultimo");
    buttonBorrarUltimo.addEventListener("click", borrarUltimo);

    function borrarUltimo(){
        jsonCarreras.pop();
        mostrarTabla();
    }
    
    let agregar_xtres = document.querySelector ("#buttonAgregar_xtres");
    agregar_xtres.addEventListener("click", agregarx3);

function agregarx3(){
    
    let i=0
    while (i<3){ 
        let carreraNueva = 
        {
        distancia: Math.floor(Math.random() * 100),
        tiempoEstimado: Math.floor(Math.random() * 600) + "min",
        record: Math.floor(Math.random() * 500) + "min",
        premios: "$" + Math.floor(Math.random() * 100000)
        }

        jsonCarreras.push(carreraNueva);
        i++;
    }
    mostrarTabla();
    }
})

 /* MENU DESPLEGABLE */






