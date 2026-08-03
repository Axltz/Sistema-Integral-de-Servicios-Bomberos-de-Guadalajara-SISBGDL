import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el sembrado de bomberos...');

  // Limpiamos la tabla por si ya había datos previos
  await prisma.bombero.deleteMany({});

  // Insertamos a nuestros bomberos de prueba con sus métricas operativas
  await prisma.bombero.createMany({
    data: [
      {
        id: 'bmb-001',
        numeroPlaca: 'GDL-101',
        nombre: 'Juan',
        apellidos: 'Pérez',
        rango: 'SUBTENIENTE',
        funcionPrincipal: 'CHOFER_PIPA',
        tipoLicencia: 'ESTATAL_C3',
        estatus: 'ACTIVO',
        fechaUltimoOperativo: new Date('2026-06-01'),
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
        fechaUltimoOperativo: new Date('2026-07-25'),
        horasAcumuladasMes: 35
      },
      {
        id: 'bmb-003',
        numeroPlaca: 'GDL-103',
        nombre: 'Sofía',
        apellidos: 'Ramírez',
        rango: 'BOMBERO_2DO',
        funcionPrincipal: 'BOMBERO_LINEA',
        tipoLicencia: 'NINGUNA',
        estatus: 'ACTIVO',
        fechaUltimoOperativo: new Date('2026-05-15'),
        horasAcumuladasMes: 5
      }
    ]
  });

  console.log('✅ ¡Bomberos sembrados exitosamente en la base de datos real!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el sembrado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });