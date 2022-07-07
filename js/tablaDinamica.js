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
            let res = await fetch(`${url}/?p=1&l=10`); //obtengo los datos de la url
            let carreras = await res.json();
                    
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
                    <button class="borrarCarrera"> Borrar </button>
                    <button class="editarCarrera"> Editar </button>
                    
                    
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
                    <button class="borrarCarrera"> Borrar </button>
                    <button class="editarCarrera"> Editar </button>
                    
                </td>
              </tr>

              `
          }
        }
        agregarEventoBorrar();
        agregarEventoEditar();
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
            premio : inputPremios,
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

    function agregarEventoEditar(){
    let btnEditar = document.querySelectorAll(".editarCarrera");
      btnEditar.forEach(boton => {            
      boton.addEventListener("click", mostrarFormEditar);    

    });
    }
    function mostrarFormEditar(event){
      document.querySelector(".formTablaEditar").classList.toggle("mostrarFormEditar");

      let id = event.target.parentNode.getAttribute("data-objectId");
      
      let botonAceptarCambios = document.querySelector("#buttonAceptarCambios");
        botonAceptarCambios.setAttribute("data-id", id)     
        botonAceptarCambios.addEventListener("click", editarCarrera );
    }

    async function editarCarrera (event) {
      
    let id = event.target.getAttribute("data-id");
      let distanciaEditada = document.querySelector ("#editarInput_Distancia").value
      let tiempoEstimadoEditado = document.querySelector ("#editarInput_Tiempo").value
      let recordEditado = document.querySelector ("#editarInput_Record").value
      let premioEditado = document.querySelector ("#editarInput_Premios").value
      let ciudadEditada =  document.querySelector ("#editarInput_Ciudad").value
     
        let carreraEditada = {
          distancia: distanciaEditada ,
          tiempoEstimado: tiempoEstimadoEditado,
          record: recordEditado,
          premio: premioEditado,
          ciudad: ciudadEditada

        }
      
      
     console.log(carreraEditada)

      try{
        let put = await fetch(`${url}/${id}`,{
            'method' : 'PUT',
            'headers': {'Content-Type' : 'application/json'},
            'body' : JSON.stringify(carreraEditada)
        })
      }
      catch(e){
          console.log(e)
      }
      document.querySelector(".formTablaEditar").classList.toggle("mostrarFormEditar");
      obtenerDatos();

    }
    let btnpag = document.querySelector("#avanzarPagina")
    btnpag.addEventListener("click", paginar)
    let i = 1;
    async function paginar(){
      if(i > 0) {
      i++; 
      }   
      
      try{
        let res = await fetch(`${url}/?p=${i}&l=10`); //obtengo los datos de la url
        let carreras = await res.json();
               
        mostrarTabla(carreras);      
        
    }catch (error){
        console.log("e");
    }  

    }
    let btnpagRetroceder = document.querySelector("#retrocederPagina")
    btnpagRetroceder.addEventListener("click", retrocederPag)
    async function retrocederPag(){
      if(i > 1) {
        i--; 
        }     
      
      try{
        let res = await fetch(`${url}/?p=${i}&l=10`); //obtengo los datos de la url
        let carreras = await res.json();
               
        mostrarTabla(carreras);      
        
    }catch (error){
        console.log("e");
    }  

    }

    let buttonAgregarTres = document.querySelector("#buttonAgregarTres");
    buttonAgregarTres.addEventListener("click", agregarTres);
    let posiblesCiudades = ["Tandil", "Necochea", "Loberia"," Mar del Plata"," Barker"," Bs As", "La Dulce"];

    async function agregarTres(){
      let i = 0;
      while(i < 3){
        
        let distancia = Math.floor(Math.random() * 100)
        let tiempoEstimado = Math.floor(Math.random() * 600) + "min"
        let record = Math.floor(Math.random() * 500) + "min"
        let premios = "$" + Math.floor(Math.random() * 100000)
        let ciudad = Math.floor(Math.random() * posiblesCiudades.length)

        let carreraRandom = generarCarreraRandom(distancia, tiempoEstimado, record, premios, ciudad);
        console.log(carreraRandom)
        try{
          let post = await fetch(url,{
              'method' : 'POST',
              'headers': {'Content-Type' : 'application/json'},
              'body' : JSON.stringify(carreraRandom)
              
              });
                  if (post.ok) {
                  console.log(r);
                  
              }
        }catch(error){
            console.log("e");            
        }   
        i++;        
        obtenerDatos();
      }
      
    }
    function generarCarreraRandom(distancia, tiempoEstimado, record, premios, ciudad){
      return {
        
          "distancia": distancia,
          "tiempoEstimado": tiempoEstimado,
          "record": record,
          "premio": premios,
          "ciudad":  posiblesCiudades[ciudad]
          }

      }
    
})

