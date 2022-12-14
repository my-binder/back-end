import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from '@/routers';
import { errorHandler } from '@/middlewares';

const app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors());

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;