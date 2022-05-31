"use strict"

//MENU DESPLEGABLE
function toggleMenu() {
document.querySelector(".nav-group").classList.toggle("show");
}
document.querySelector(".btn-menu").addEventListener("click", toggleMenu);

/*

function toggleMenu() {
    let group = document.querySelector(".nav-group");
    group.classList.toggle("show");
 }
 let boton= document.querySelector(".btn-menu");
 boton.addEventListener("click", toggleMenu); */