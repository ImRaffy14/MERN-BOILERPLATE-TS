require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})