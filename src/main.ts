const observador = new IntersectionObserver((entradas)=>{
    entradas.forEach((entrada)=>{
        if(entrada.isIntersecting){
            entrada.target.classList.add("visible");
        }
    });
},{
    threshold:0.2
});

document.querySelectorAll(".oculto").forEach((elemento)=>{
    observador.observe(elemento);
});