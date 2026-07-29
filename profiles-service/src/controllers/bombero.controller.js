const bomberoService = require('../services/bombero.service');

const getBomberos = (req, res) => {
  try {
    const bomberos = bomberoService.obtenerTodosLosBomberos();
    res.status(200).json({
      status: 'success',
      total: bomberos.length,
      data: bomberos
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el listado de bomberos'
    });
  }
};

module.exports = {
  getBomberos
};