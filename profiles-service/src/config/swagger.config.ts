export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Gestión de Personal - Bomberos Guadalajara',
    version: '1.0.0',
    description: 'API RESTful modular con motor de equidad y selección de prioridad operativa.'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor Local de Desarrollo'
    }
  ],
  paths: {
    '/api/v1/bomberos': {
      get: {
        summary: 'Obtener catálogo completo de bomberos',
        description: 'Retorna la lista de todo el personal registrado independientemente de su estatus.',
        responses: {
          '200': {
            description: 'Lista obtenida con éxito'
          }
        }
      }
    },
    '/api/v1/bomberos/prioridad/asignacion': {
      get: {
        summary: 'Calcular Cola de Prioridad Equitativa',
        description: 'Aplica el algoritmo de Score de Prioridad basado en días de inactividad y horas acumuladas.',
        responses: {
          '200': {
            description: 'Cola calculada y ordenada por Score de mayor a menor'
          }
        }
      }
    },
    '/api/v1/bomberos/{id}': {
      get: {
        summary: 'Consultar bombero por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: 'bmb-001'
          }
        ],
        responses: {
          '200': { description: 'Bombero encontrado' },
          '404': { description: 'Bombero no encontrado' }
        }
      }
    }
  }
};