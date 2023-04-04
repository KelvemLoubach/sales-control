import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
dotenv.config()

export  const sequelizeMysqlConection = new Sequelize(
     process.env.MYSQL_DB as string,
     process.env.MYSQL_USER as string,
     process.env.MYSQL_PASSWORD as string,
    {
        dialect:'postgres',
        port: parseInt(process.env.MYSQL_PORT as string)
    } ,  
);

