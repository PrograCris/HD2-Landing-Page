const observador = new IntersectionObserver((entradas: IntersectionObserverEntry[]) => {

    entradas.forEach((entrada: IntersectionObserverEntry) => {

        if(entrada.isIntersecting){

            entrada.target.classList.add("visible");

        }

    });

},{
    threshold:0.2
});


document.querySelectorAll<HTMLElement>(".oculto").forEach((elemento: HTMLElement)=>{

    observador.observe(elemento);

});

import { GestorContactos } from "./formulario.js";

const gestor = new GestorContactos(
    "#formulario",
    "#error",
    "#lista-contactos"
);

const btnGuardar = document.querySelector("#guardar") as HTMLButtonElement;

btnGuardar?.addEventListener("click", () => {
    gestor.guardarJSON();
});