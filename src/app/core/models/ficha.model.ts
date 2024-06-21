import { Cliente } from "./cliente.model";
import { FichaReparacion } from "./ficha_reparacion.model";
import { Vehiculo } from "./vehiculo.model";

export interface Ficha {
    id_ficha: number;
    numero_ficha: string;
    fecha: string;
    otros: string;
    cliente: Cliente;
    vehiculo: Vehiculo;
}

export interface createFichaDTO extends Omit<Ficha, 'id_ficha' | 'numero_ficha' | 'fecha'
    | 'cliente' | 'vehiculo'> {
    id_cliente: number;
    id_vehiculo: number;
    reparaciones: FichaReparacion[];
}
