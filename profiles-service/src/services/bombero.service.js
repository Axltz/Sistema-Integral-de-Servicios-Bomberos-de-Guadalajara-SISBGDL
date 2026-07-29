const bomberosMock = [
  {
    id: "bmb-001",
    numeroPlaca: "GDL-101",
    nombre: "Juan Perez",
    rango: "Subteniente",
    funcionPrincipal: "CHOFER_PIPA",
    tipoLicencia: "ESTATAL_C3",
    estatus: "ACTIVO"
  },
  {
    id: "bmb-002",
    numeroPlaca: "GDL-102",
    nombre: "Carlos Mendoza",
    rango: "Bombero 1ro",
    funcionPrincipal: "MAQUINISTA",
    tipoLicencia: "ESTATAL_C3",
    estatus: "ACTIVO"
  },
  {
    id: "bmb-003",
    numeroPlaca: "GDL-103",
    nombre: "Sofia Ramirez",
    rango: "Bombero 2do",
    funcionPrincipal: "BOMBERO_LINEA",
    tipoLicencia: "NINGUNA",
    estatus: "VACACIONES"
  }
];

const obtenerTodosLosBomberos = () => {
  return bomberosMock;
};

module.exports = {
  obtenerTodosLosBomberos
};