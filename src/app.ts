import express, { Application } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import globalRoute from './app/routes';
import healthCheck from './app/middlewares/healthCheck';

const app: Application = express();

// Parser
app.use(express.json());
app.use(
    cors({
        origin: [
            '*',
            'http://localhost:3000',
            'https://travel-buddy-front-end.vercel.app',
        ],
    }),
);

// App route
app.use('/api/v1', globalRoute);

// Server Health Check Route
app.get('/', healthCheck);
app.get('/health', healthCheck);

// Global Error Handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
