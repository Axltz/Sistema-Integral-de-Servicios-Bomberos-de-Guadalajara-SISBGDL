import { IBombero } from '../models/bombero.model';

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
    fechaUltimoOperativo: new Date('2026-06-01'), // Hace bastante tiempo (alta prioridad)
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
    fechaUltimoOperativo: new Date('2026-07-25'), // Operativo reciente (baja prioridad)
    horasAcumuladasMes: 35 // Muchas horas trabajadas
  },
  {
    id: 'bmb-003',
    numeroPlaca: 'GDL-103',
    nombre: 'Sofía',
    apellidos: 'Ramírez',
    rango: 'BOMBERO_2DO',
    funcionPrincipal: 'BOMBERO_LINEA',
    tipoLicencia: 'NINGUNA',
    estatus: 'VACACIONES',
    fechaUltimoOperativo: new Date('2026-05-15'), // La que tiene más tiempo inactiva
    horasAcumuladasMes: 5
  }
];

// 3. Clase del Servicio (Aplica el principio de Responsabilidad Única)
export class BomberoService {
  public async obtenerTodos(): Promise<IBombero[]> {
    return bomberosMock;
  }

  public async obtenerPorId(id: string): Promise<IBombero | null> {
    const bombero = bomberosMock.find(b => b.id === id);
    return bombero || null;
  }
}