import { PrismaClient } from '@prisma/client';
import { IBombero, RangoBombero, FuncionOperativa, EstatusLaboral } from '../models/bombero.model';
import { IBomberoRepository } from './bombero.repository.interface';

// 1. Inicializamos el cliente traductor de Prisma
const prisma = new PrismaClient();

export class BomberoPrismaRepository implements IBomberoRepository {

  // Consultar todos los bomberos de la base de datos real
  public async obtenerTodos(): Promise<IBombero[]> {
    const registros = await prisma.bombero.findMany();
    
    // Mapeamos los datos de Prisma al formato de nuestra interfaz IBombero
    return registros.map(r => this.mapearABombero(r));
  }

  // Consultar por ID
  public async obtenerPorId(id: string): Promise<IBombero | null> {
    const registro = await prisma.bombero.findUnique({ where: { id } });
    if (!registro) return null;
    return this.mapearABombero(registro);
  }

  // Consultar solo los bomberos con estatus 'ACTIVO'
  public async obtenerActivos(): Promise<IBombero[]> {
    const registros = await prisma.bombero.findMany({
      where: { estatus: 'ACTIVO' }
    });
    return registros.map(r => this.mapearABombero(r));
  }

  // Agregar un nuevo bombero a la base de datos
  public async agregar(bombero: IBombero): Promise<IBombero> {
    const nuevo = await prisma.bombero.create({
      data: {
        numeroPlaca: bombero.numeroPlaca,
        nombre: bombero.nombre,
        apellidos: bombero.apellidos,
        rango: bombero.rango,
        funcionPrincipal: bombero.funcionPrincipal,
        tipoLicencia: bombero.tipoLicencia,
        estatus: bombero.estatus,
        fechaUltimoOperativo: bombero.fechaUltimoOperativo,
        horasAcumuladasMes: bombero.horasAcumuladasMes
      }
    });
    return this.mapearABombero(nuevo);
  }

  // Actualizar un bombero existente por su ID
  public async actualizar(id: string, bombero: Partial<IBombero>): Promise<IBombero | null> {
    try {
      const actualizado = await prisma.bombero.update({
        where: { id },
        data: bombero
      });
      return this.mapearABombero(actualizado);
    } catch {
      // Si el registro no existe, Prisma lanza un error — devolvemos null
      return null;
    }
  }

  // Eliminar un bombero por su ID
  public async eliminar(id: string): Promise<boolean> {
    try {
      await prisma.bombero.delete({ where: { id } });
      return true;
    } catch {
      // Si el registro no existe, devolvemos false
      return false;
    }
  }

  // Actualizar métricas tras un operativo
  public async actualizarMetricasOperativas(id: string, fecha: Date, horas: number): Promise<IBombero | null> {
    const registroActualizado = await prisma.bombero.update({
      where: { id },
      data: {
        fechaUltimoOperativo: fecha,
        horasAcumuladasMes: { increment: horas } // Prisma incrementa el número automáticamente
      }
    });
    return this.mapearABombero(registroActualizado);
  }

  // Método privado auxiliar para convertir el tipo de Prisma al modelo de nuestro dominio
  private mapearABombero(registro: any): IBombero {
    return {
      id: registro.id,
      numeroPlaca: registro.numeroPlaca,
      nombre: registro.nombre,
      apellidos: registro.apellidos,
      rango: registro.rango as RangoBombero,
      funcionPrincipal: registro.funcionPrincipal as FuncionOperativa,
      tipoLicencia: registro.tipoLicencia,
      estatus: registro.estatus as EstatusLaboral,
      fechaUltimoOperativo: registro.fechaUltimoOperativo,
      horasAcumuladasMes: registro.horasAcumuladasMes
    };
  }
}