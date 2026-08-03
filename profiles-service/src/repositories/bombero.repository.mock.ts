import { IBombero } from "../models/bombero.model";
import { IBomberoRepository } from "./bombero.repository.interface";

const bomberosMock: IBombero[] = [
  {
    id: 'bmb-001',
    numeroPlaca: 'GDL-101',
    nombre: 'Juan',
    apellidos: 'Pérez',
    rango: 'SUBTENIENTE',
    funcionPrincipal: 'CHOFER_PIPA',
    tipoLicencia: 'ESTATAL_C3',
    estatus: 'ACTIVO',
    fechaUltimoOperativo: new Date('2026-06-01'),
    horasAcumuladasMes: 10
  },
  {
    id: 'bmb-002',
    numeroPlaca: 'GDL-102',
    nombre: 'Carlos',
    apellidos: 'Mendoza',
    rango: 'BOMBERO_1RO',
    funcionPrincipal: 'MAQUINISTA',
    tipoLicencia: 'ESTATAL_C3',
    estatus: 'ACTIVO',
    fechaUltimoOperativo: new Date('2026-07-25'),
    horasAcumuladasMes: 35
  },
  {
    id: 'bmb-003',
    numeroPlaca: 'GDL-103',
    nombre: 'Sofía',
    apellidos: 'Ramírez',
    rango: 'BOMBERO_2DO',
    funcionPrincipal: 'BOMBERO_LINEA',
    tipoLicencia: 'NINGUNA',
    estatus: 'ACTIVO',
    fechaUltimoOperativo: new Date('2026-05-15'),
    horasAcumuladasMes: 5
  }
];

export class BomberoRepositoryMock implements IBomberoRepository {
  public async obtenerTodos(): Promise<IBombero[]> {
    return bomberosMock;
  }

  public async obtenerPorId(id: string): Promise<IBombero | null> {
    const bombero = bomberosMock.find(b => b.id === id);
    return bombero || null;
  }

  public async obtenerActivos(): Promise<IBombero[]> {
    return bomberosMock.filter(b => b.estatus === 'ACTIVO');
  }

  public async actualizarMetricasOperativas(id: string, fecha: Date, horas: number): Promise<IBombero | null> {
    const bombero = bomberosMock.find(b => b.id === id);
    if (!bombero) return null;

    bombero.fechaUltimoOperativo = fecha;
    bombero.horasAcumuladasMes += horas;
    return bombero;
  }

  public async agregar(bombero: IBombero): Promise<IBombero> {
    bomberosMock.push(bombero);
    return bombero;
  }

  public async actualizar(id: string, datos: Partial<IBombero>): Promise<IBombero | null> {
    const index = bomberosMock.findIndex(b => b.id === id);
    if (index === -1) return null;

    bomberosMock[index] = { ...bomberosMock[index], ...datos };
    return bomberosMock[index];
  }

  public async eliminar(id: string): Promise<boolean> {
    const index = bomberosMock.findIndex(b => b.id === id);
    if (index === -1) return false;

    bomberosMock.splice(index, 1);
    return true;
  }
}