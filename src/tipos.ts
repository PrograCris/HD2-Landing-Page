export interface IContacto {
    readonly id: number;
    nombre: string;
    correo: string;
    mensaje: string;
}

export type TipoPlan = "gratis" | "emprendedor" | "empresa";

export type Resultado<T> = {
    ok: boolean;
    datos: T;
};