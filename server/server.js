import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import rootRoutes from './routes/root.js';
import notFoundRoutes from './routes/notFound.js';
import {logger}  from './middleware/logger.js';
import errorHandler  from './middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;


app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', rootRoutes);

app.all('*', notFoundRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`connected on ${PORT}`));