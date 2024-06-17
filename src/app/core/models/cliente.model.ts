import { Usuario } from "./usuario.model";

export interface Cliente {
    id_cliente: number;
    id_usuario: number;
    usuario: Usuario
}