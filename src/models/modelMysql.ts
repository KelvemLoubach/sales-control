import  {Model, DataTypes } from 'sequelize';
import {sequelizeMysqlConection} from '../instances/mysqlInstance'

export interface userInstance extends Model {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string
};


export const UserMysql = sequelizeMysqlConection.define<userInstance>('createUser', {
    id:{
        type: DataTypes.NUMBER,
        autoIncrement:true,
        primaryKey:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
    },
},
{
    tableName:'createUser',
    timestamps:false

}
)