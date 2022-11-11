import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import rootRoutes from './routes/root.js';
import notFoundRoutes from './routes/notFound.js';
import userRoutes from './routes/user.js';
import noteRoutes from './routes/note.js';

import {logger}  from './middleware/logger.js';
import errorHandler  from './middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import conncetDB from './config/dbconn.js';
import { logEvents } from './middleware/logger.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

conncetDB();

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', rootRoutes);

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.all('*', notFoundRoutes);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`connected on ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
});