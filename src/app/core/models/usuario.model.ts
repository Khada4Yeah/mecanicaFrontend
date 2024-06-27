
export interface Usuario {
    id_usuario: number;
    cedula: string;
    nombres: string;
    apellido_p: string;
    apellido_m: string;
    correo_electronico: string;
    celular: string;
    created_at: string;
    updated_at: string;
}

export interface CreateUsuarioDTO
    extends Omit<Usuario, 'id_usuario | created_at | upadted_at'> { }


export interface UpdateUsuarioDTO extends Partial<Usuario> {
}