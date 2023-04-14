import dotenv from 'dotenv';
dotenv.config();

let database = {
    database:process.env.MYSQL_DB as string,
    user:process.env.MYSQL_USER as string,
    password:process.env.MYSQL_PASSWORD as string,
    port:process.env.MYSQL_PORT as string
};

if(process.env.NODE_ENV === 'test'){
    database = {
        database:process.env.MYSQL_DB_TEST as string,
        user:process.env.MYSQL_USER_TEST as string,
        password:process.env.MYSQL_PASSWORD_TEST as string,
        port:process.env.MYSQL_PORT_TEST as string
    };
};

export default database;