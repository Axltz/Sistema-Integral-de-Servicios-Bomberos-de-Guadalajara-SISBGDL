import { Router } from "express";
import { BomberoController } from "../controllers/bombero.controller";

const router = Router();
const bomberoController = new BomberoController();

router.get('/bomberos', bomberoController.obtenerTodos);
router.get('/bomberos/:id', bomberoController.obtenerPorId);
router.get('/prioridad/asignacion', bomberoController.obtenerColaPrioridad);

router.get('/', (req, res) => {
  bomberoController.obtenerTodos(req, res);
});
router.get('/:id', (req, res) => {
  bomberoController.obtenerPorId(req, res);
})
router.get('/prioridad/asignacion', (req, res) => {
  bomberoController.obtenerColaPrioridad(req, res);
})

export default router;