import { Cliente } from "./cliente.model";

export interface Vehiculo {
    id_vehiculo: number;
    marca: string;
    modelo: string;
    chasis: string;
    motor: string;
    placa: string;
    id_cliente: number;
    created_at: string;
    updated_at: string;
    cliente: Cliente;
}

export interface createVehiculoDTO extends Omit<Vehiculo, 'id_vehiculo | created_at | updated_at | cliente'> {
    id_cliente: number;
}