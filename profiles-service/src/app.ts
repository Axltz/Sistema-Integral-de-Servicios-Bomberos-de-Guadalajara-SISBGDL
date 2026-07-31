import express, {Application} from "express";
import bomberosRoutes from './routes/bombero.routes';

const app: Application = express();

app.use(express.json());

app.use('/api/v1/bomberos', bomberosRoutes);

export default app;
