import { IBombero } from '../models/bombero.model';

export interface IBomberoPriority {
  bombero: IBombero;
  score: number;
  diasInactivo: number;
}


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

  public async obtenerPrioridadAsignacion(): Promise<IBomberoPriority[]> {
    const HOY = new Date('2026-07-30'); // Simulamos la fecha actual

    // 1. Filtramos solo los bomberos que estén en estatus 'ACTIVO'
    const activos = bomberosMock.filter(b => b.estatus === 'ACTIVO');

    // 2. Calculamos el score para cada bombero
    const listaConScore: IBomberoPriority[] = activos.map(bombero => {
      // Diferencia en milisegundos convertida a días
      const diferenciaMs = HOY.getTime() - bombero.fechaUltimoOperativo.getTime();
      const diasInactivo = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      // FÓRMULA DE SCORE: (Días inactivo * 2) - (Horas acumuladas * 1)
      // Ajustamos los pesos: los días sin ir dan más valor (+2), las horas trabajadas restan (-1)
      const score = (diasInactivo * 2) - (bombero.horasAcumuladasMes * 1);

      return {
        bombero,
        score,
        diasInactivo
      };
    });

    // 3. Ordenamos de MAYOR a MENOR score (Mayor score = mayor prioridad)
    return listaConScore.sort((a, b) => b.score - a.score);
  }
}

