// 1. Importamos las interfaces que creamos en el modelo.
// Nota cómo TypeScript nos obliga a cumplir con los tipos exactos.
import { IBombero } from '../models/bombero.model';

// 2. Definimos datos de prueba (Mock Data) tipados estrictamente.
// Si aquí escribieras "rango: 'CAPITAN'", TypeScript marcaría error porque no está en RangoBombero.
const bomberosMock: IBombero[] = [
  {
    id: 'bmb-001',
    numeroPlaca: 'GDL-101',
    nombre: 'Juan',
    apellidos: 'Pérez',
    rango: 'SUBTENIENTE',
    funcionPrincipal: 'CHOFER_PIPA',
    tipoLicencia: 'ESTATAL_C3',
    estatus: 'ACTIVO'
  },
  {
    id: 'bmb-002',
    numeroPlaca: 'GDL-102',
    nombre: 'Carlos',
    apellidos: 'Mendoza',
    rango: 'BOMBERO_1RO',
    funcionPrincipal: 'MAQUINISTA',
    tipoLicencia: 'ESTATAL_C3',
    estatus: 'ACTIVO'
  },
  {
    id: 'bmb-003',
    numeroPlaca: 'GDL-103',
    nombre: 'Sofía',
    apellidos: 'Ramírez',
    rango: 'BOMBERO_2DO',
    funcionPrincipal: 'BOMBERO_LINEA',
    tipoLicencia: 'NINGUNA',
    estatus: 'VACACIONES'
  }
];

// 3. Clase del Servicio (Aplica el principio de Responsabilidad Única)
export class BomberoService {
  
  /**
   * Obtiene todos los bomberos registrados
   * Retorna una promesa con un arreglo de objetos que cumplen la interfaz IBombero
   */
  public async obtenerTodos(): Promise<IBombero[]> {
    // Por ahora retornamos los datos ficticios en memoria.
    // Más adelante, aquí estará la consulta SQL a la Base de Datos.
    return bomberosMock;
  }

  /**
   * Obtiene un bombero por su ID único
   */
  public async obtenerPorId(id: string): Promise<IBombero | null> {
    const bombero = bomberosMock.find(b => b.id === id);
    return bombero || null;
  }
}