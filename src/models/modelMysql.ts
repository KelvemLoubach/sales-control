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
);

export interface productsInstances extends Model  {
    product_cod: number,
    qt_itens: number,
    product_description: string,
    product_value: string,
    cost_price: number,
    productSold:boolean,
    client_id:number
};

export const productsMysql = sequelizeMysqlConection.define<productsInstances>('products',{

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    product_cod:{
        type:DataTypes.INTEGER,
    },

    qt_itens:{
        type: DataTypes.INTEGER
    },

    product_description:{
        type: DataTypes.STRING,
    },

    product_value:{
        type:DataTypes.DECIMAL
    },

    cost_price:{
        type:DataTypes.DECIMAL
    },

    productSold:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },

    UserMysql_id:{
        type:DataTypes.NUMBER,
        references: {
          model: UserMysql,
          key: 'id'
        }
    }
},
{
    tableName:'products',
    timestamps:false
}
);

UserMysql.hasMany(productsMysql, { foreignKey: 'UserMysql_id' });
productsMysql.belongsTo(UserMysql, { foreignKey: 'UserMysql_id' });