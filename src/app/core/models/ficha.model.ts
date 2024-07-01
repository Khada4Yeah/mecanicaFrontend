import { Cliente } from "./cliente.model";
import { Vehiculo } from "./vehiculo.model";

export interface Ficha {
    id_ficha: number;
    numero_ficha: string;
    fecha: string;
    otros: string;
    cliente: Cliente;
    vehiculo: Vehiculo;
}

export interface createFichaDTO {
    ficha: {
        id_cliente: number;
        id_vehiculo: number;
        otros: string;
        fecha?: string;
    };
    reparaciones: {
        id_reparacion: number;
        informacion_adicional: JSON | null;
    }[];
}
