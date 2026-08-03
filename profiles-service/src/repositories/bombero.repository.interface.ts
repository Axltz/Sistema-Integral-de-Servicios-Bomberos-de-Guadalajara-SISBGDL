import { IBombero } from "../models/bombero.model";


export interface IBomberoRepository {
    obtenerTodos(): Promise<IBombero[]>;
    obtenerPorId(id: string): Promise<IBombero | null>;
    obtenerActivos(): Promise<IBombero[]>;
    agregar(bombero: IBombero): Promise<IBombero>;
    actualizar(id: string, bombero: Partial<IBombero>): Promise<IBombero | null>;
    eliminar(id: string): Promise<boolean>;
    actualizarMetricasOperativas(id: string, fecha: Date, horas: number): Promise<IBombero | null>;
}