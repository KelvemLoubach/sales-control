import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
import database from './database'

dotenv.config()

export  const sequelizeMysqlConection =  new Sequelize(

     database.database,
     database.user,
     database.password,

    {
        dialect:'mysql',
        port:parseInt(database.port)
    }   
);

