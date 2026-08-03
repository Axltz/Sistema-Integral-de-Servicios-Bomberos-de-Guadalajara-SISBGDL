import express, { Application } from "express";
import bomberosRoutes from './routes/bombero.routes';
import { apiReference } from "@scalar/express-api-reference";
import { openApiSpec } from "./config/swagger.config";

const app: Application = express();

app.use(express.json());

// Montamos la interfaz visual moderna en /docs
app.use(
  '/docs',
  apiReference({
    spec: {
      content: openApiSpec,
    },
    theme: 'purple', // Tema visual elegante y minimalista
  })
);

// Rutas principales
app.use('/api/v1/bomberos', bomberosRoutes);

export default app;