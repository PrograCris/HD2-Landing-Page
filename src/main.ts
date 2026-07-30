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