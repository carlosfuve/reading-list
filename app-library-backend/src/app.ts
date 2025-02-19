import routes from './routes';
import express, { Application } from 'express';
import { corsMiddleware } from './modules/shared/services/CorsService';

const app: Application = express();
app.disable('x-powered-by');

app.use(corsMiddleware());
app.use(express.json());
app.use(routes);

export default app;
