document.addEventListener("DOMContentLoaded", ()=>{
    /* CAPTCHA */
    //me traigo el boton generar y le asigno el evento click para llamar a la funcion mostrar captcha
    let btn_generar= document.querySelector("#generar-captcha");
    btn_generar.addEventListener ("click",mostrarCaptcha);
    //me traigo el boton validar y le asigno el evento click para llamar a la funcion validar captcha 
    let btn_validar= document.querySelector("#validar-captcha");
    btn_validar.addEventListener ("click",validarCaptcha);
    //me traigo el p (parrafo) donde voy a mostrar la respuesta una vez validado el captcha
    let respuesta= document.querySelector("#respuesta");


    let captcha = "KheprI10";
    //la funcion mostrar captcha me traigo otro p para mostrar el captcha por pantalla
    function mostrarCaptcha () {
        let textoCaptcha = document.querySelector("#captcha");  
        textoCaptcha.innerHTML = captcha;

    }
    //me traigo lo ingresado por el usuario en el input y valido si es igual o no al captcha
    function validarCaptcha () {
        let inputCaptcha =  document.querySelector("#input-captcha"); 
        
        if (captcha == inputCaptcha.value) { //.value agarra el valor de lo ingresado en el input
            respuesta.innerHTML = "Correcto" //.innerHTML se refiere a lo que tenga entre los tag 
        }  
        else {respuesta.innerHTML=  "Error"} 
    };
})
    /*CAPTCHA */
