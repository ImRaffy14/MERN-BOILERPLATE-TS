require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(errorHandler)


export default app;