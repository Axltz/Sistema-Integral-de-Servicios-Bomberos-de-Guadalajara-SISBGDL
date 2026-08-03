import { IBombero } from '../models/bombero.model';
import { IBomberoRepository } from '../repositories/bombero.repository.interface';
import { BomberoPrismaRepository } from '../repositories/bombero.repository.prisma';

export interface IBomberoPrioridad {
  bombero: IBombero;
  score: number;
  diasInactivo: number;
}

export class BomberoService {
  private repository: IBomberoRepository;

  constructor(repository: IBomberoRepository = new BomberoPrismaRepository()) {
    this.repository = repository;
  }

  public async obtenerTodos(): Promise<IBombero[]> {
    return this.repository.obtenerTodos();
  }

  public async obtenerPorId(id: string): Promise<IBombero | null> {
    return this.repository.obtenerPorId(id);
  }

  public async obtenerColaPrioridad(): Promise<IBomberoPrioridad[]> {
    const HOY = new Date('2026-07-30');
    const activos = await this.repository.obtenerActivos();

    const listaConScore: IBomberoPrioridad[] = activos.map(bombero => {
      const diferenciaMs = HOY.getTime() - bombero.fechaUltimoOperativo.getTime();
      const diasInactivo = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
      const score = (diasInactivo * 2) - (bombero.horasAcumuladasMes * 1);

      return {
        bombero,
        score,
        diasInactivo
      };
    });

    return listaConScore.sort((a, b) => b.score - a.score);
  }
}