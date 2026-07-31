import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Microservicio de Perfiles corriendo en: http://localhost:${PORT}`);
  console.log(`📋 Pruebas disponibles:`);
  console.log(`   - Ver todos: http://localhost:${PORT}/api/v1/bomberos`);
  console.log(`   - Ver por ID: http://localhost:${PORT}/api/v1/bomberos/bmb-001`);
});