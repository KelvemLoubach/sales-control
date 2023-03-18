import express, { Request, Response} from 'express';
import mainRoutes from './routers/router';
import mustache from 'mustache-express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public/theme/')));
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(cors());

server.use(mainRoutes);

server.listen(process.env.PORT);