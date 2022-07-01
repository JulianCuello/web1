" use strict"

document.addEventListener("DOMContentLoaded", ()=>{
    
    /*MENU DESPLEGABLE*/
    function toggleMenu() {
    document.querySelector(".nav-group").classList.toggle("show");
    }
    document.querySelector(".btn-menu").addEventListener("click", toggleMenu);
    /*MENU DESPLEGABLE*/

    /*TABLA DINAMICA SPA*/
    
    const url = 'https://62bdfbb9c5ad14c110c9fe86.mockapi.io/api/running/carreras';
    let tabla = document.querySelector("#tabla_dinamica");
    obtenerDatos();   
    
    async function obtenerDatos(){
        try{
            let res = await fetch(url); //obtengo los datos de la url
            let carreras = await res.json();
            console.log(carreras);        
            mostrarTabla(carreras);      
            
        }catch (error){
            console.log("e");
        }  
    }
    async function mostrarTabla (carreras) {
        tabla.innerHTML = '';  //vacio la tabla, para no cargar multiples veces la misma data

        for(const carrera of carreras){
            let distancia = carrera.distancia;
            let tiempoEstimado = carrera.tiempoEstimado;
            let record = carrera.record;
            let premio = carrera.premio;
            let ciudad = carrera.ciudad;
          if(distancia > 40){
            tabla.innerHTML += 
                `<tr class="filaResaltada">
                    <td class="celdas">
                    <b>${distancia} Km</b>
                    </td>
                    <td class="celdas">
                    <b>${tiempoEstimado}</b>
                    </td>
                    <td class="celdas">
                    <b> ${record} </b>
                    </td>
                    <td class="celdas">
                    <b> ${premio} </b>
                    </td>
                    <td class="celdas">
                    <b> ${ciudad} </b>
                    </td>
                    <td class="celdas" data-objectId="${carrera.id}">
                    <button id = "botonBorrarCelda" class="borrarCarrera"> Borrar </button>
                    </td>
              </tr>
              `
          }else{
            tabla.innerHTML += 
                `<tr>
                <td class="celdas">
                  <b>${distancia} Km</b>
                </td>
                <td class="celdas">
                  <b>${tiempoEstimado}</b>
                </td>
                <td class="celdas">
                  <b> ${record} </b>
                </td>
                <td class="celdas">
                  <b> ${premio} </b>
                </td>
                <td class="celdas">
                  <b> ${ciudad} </b>
                </td>
                <td class="celdas" data-objectId="${carrera.id}">
                    <button type="button" class="borrarCarrera"> Borrar </button>
                </td>
              </tr>

              `
          }
        }
        agregarEventoBorrar();
      }

      let buttonAgregar = document.querySelector ("#buttonAgregar");
      buttonAgregar.addEventListener("click", agregar);
      
      async function agregar(e){
          e.preventDefault();

          //Obtengo los valores de los inputs 
          let inputDistancia = document.querySelector ("#input_Distancia").value;
          let inputTiempo = document.querySelector ("#input_Tiempo").value;
          let inputRecord = document.querySelector ("#input_Record").value;
          let inputPremios = document.querySelector ("#input_Premios").value;
          let inputCiudad = document.querySelector ("#input_Ciudad").value;

        //Declaro mi variable de tipo JSON donde armo una nueva carrera con los valores de los inputs.
        let jsonCarrera = {
            distancia : inputDistancia,
            tiempoEstimado : inputTiempo,
            record : inputRecord,
            premios : inputPremios,
            ciudad : inputCiudad
        }
           
        try{
            let post = await fetch(url,{
                'method' : 'POST',
                'headers': {'Content-Type' : 'application/json'},
                'body' : JSON.stringify(jsonCarrera)
                });
                    if (post.ok) {
                    console.log(r);
                }
        }catch(error){
            console.log("e");            
        }             
    
          obtenerDatos();
    }

    

    function agregarEventoBorrar(){
        let btnBorrarCarrera = document.querySelectorAll(".borrarCarrera");
        console.log('AAAAAAAAAA')
        btnBorrarCarrera.forEach(boton => {            
            boton.addEventListener("click", borrar);      
            
        });
    }
    
    async function borrar(event){
        //obtiene el atributo ligado al padre que contiene el boton Borrar que dispara el evento de esta funcion.
        //El padre tiene el id del Objeto referenciado en el atributo, en este caso data-objectID.
        let id = event.target.parentNode.getAttribute("data-objectId");             
        console.log(id);

        try{
            let del = await fetch(`${url}/${id}`,{
                'method' : 'DELETE'
        }
        );
        
        }catch(error){
                console.log("error")
        }

        obtenerDatos();                  
    }

})