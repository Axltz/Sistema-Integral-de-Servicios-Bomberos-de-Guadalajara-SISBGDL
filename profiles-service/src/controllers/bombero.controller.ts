import { Request, Response } from "express";
import { BomberoService } from "../services/bombero.service";

const bomberoService = new BomberoService();

export class BomberoController {
  public async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const bomberos = await bomberoService.obtenerTodos();

      res.status(200).json({
        status: 'success',
        total: bomberos.length,
        data: bomberos
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error interno al obtener los datos de bomberos'
      });
    }
  }  
  public async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string; // Extrae el parámetro :id de la URL
      const bombero = await bomberoService.obtenerPorId(id);

      if (!bombero) {
        // Si no existe, enviamos HTTP 404 (Not Found)
        res.status(404).json({
          status: 'error',
          message: `No se encontró ningún bombero con el ID: ${id}`
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: bombero
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error interno al buscar el bombero'
      });
    }
  }
}