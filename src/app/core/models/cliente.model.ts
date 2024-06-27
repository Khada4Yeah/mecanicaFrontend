import { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO } from "./usuario.model";

export interface Cliente {
    id_cliente: number;
    id_usuario: number;
    usuario: Usuario
}

export interface CreateClienteDTO extends CreateUsuarioDTO {
}

export interface UpdateClienteDTO extends UpdateUsuarioDTO { }