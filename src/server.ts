import express from 'express';
import mainRoutes from './routers/router';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParse from 'cookie-parser';


dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public/theme/')));
server.use(express.urlencoded({ extended: true }));

server.use(cors());
server.use(cookieParse());

server.use(mainRoutes);

server.listen(process.env.PORT);
console.log(`Rodando na porta: ${process.env.PORT}`); 