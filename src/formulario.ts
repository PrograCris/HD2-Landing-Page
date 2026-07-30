import { Lead } from "./modelos.js";
import { TipoPlan, Resultado } from "./tipos.js";

export class GestorContactos {

    #leads: Lead[] = [];
    #siguienteId: number = 1;
    #form: HTMLFormElement;
    #error: HTMLElement;
    #lista: HTMLElement;

    constructor(
        formSelector: string,
        errorSelector: string,
        listaSelector: string
    ) {

        this.#form = document.querySelector(formSelector) as HTMLFormElement;
        this.#error = document.querySelector(errorSelector) as HTMLElement;
        this.#lista = document.querySelector(listaSelector) as HTMLElement;

        this.#form.addEventListener("submit", (e) => this.#alEnviar(e));
    }


    #validar(nombre: string, correo: string): Resultado<string> {

        if(nombre.trim().length < 3){

            return {
                ok:false,
                datos:"El nombre debe tener al menos 3 caracteres"
            };

        }

        if(!correo.includes("@")){

            return {
                ok:false,
                datos:"Correo inválido"
            };

        }

        return {
            ok:true,
            datos:""
        };
    }


    #alEnviar(evento: Event): void {

        evento.preventDefault();

        const datos = Object.fromEntries(
            new FormData(this.#form)
        );

        const nombre = String(datos.nombre);
        const correo = String(datos.correo);
        const plan = (datos.plan ?? "gratis") as TipoPlan;


        const validacion = this.#validar(nombre, correo);


        if(!validacion.ok){

            this.#error.textContent = validacion.datos;
            return;

        }


        this.#error.textContent = "";


        this.#leads.push(
            new Lead(
                this.#siguienteId++,
                nombre,
                correo,
                plan
            )
        );


        this.#render();

        this.#form.reset();

    }


    #render(): void {

        this.#lista.innerHTML = "";


        this.#leads.forEach((lead)=>{

            const li = document.createElement("li");

            li.textContent = lead.presentar();

            this.#lista.append(li);

        });

    }


    guardarJSON(): void {

        const json = JSON.stringify(
            this.#leads,
            null,
            2
        );


        const blob = new Blob(
            [json],
            {type:"application/json"}
        );


        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "contactos.json";

        a.click();

    }

}