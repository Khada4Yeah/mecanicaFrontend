import { Cliente } from "./cliente.model";
import { Vehiculo } from "./vehiculo.model";

export interface Ficha {
    id_ficha: number;
    numero_ficha: string;
    fecha: string;
    cliente: Cliente;
    vehiculo: Vehiculo;
}

export interface createFichaDTO extends Omit<Ficha, 'id_ficha' | 'cliente' | 'vehiculo'> {
    id_cliente: number;
    id_vehiculo: number;
}