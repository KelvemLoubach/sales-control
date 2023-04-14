import { UserMysql, productsMysql, userInstance } from '../models/modelMysql';
import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';




export const serviceCreateUser = async (firstName: string, lastName: string, email: string, password: string) => {

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const [newUser, create] = await UserMysql.findOrCreate({
            where: { email },
            defaults: {
                firstName,
                lastName,
                email,
                password: passwordHash
            }
        });

        return { newUser, create };

    } catch (error) {
        console.error(`Erro ao criar usuário ${error}`);
    }

};

//----------------------------------------------------------------------------//

export const login = async (email: string, password: string) => {

    try {
        const userVerification = await UserMysql.findOne({ where: { email }});

        if (userVerification) {

            const id = userVerification.id;

            let matchPassword = await bcrypt.compare(password, userVerification.password);
           
            return { matchPassword, id };
        }
        
    } catch (error) {

        console.error(`Error --> ${error}`)
    }
};

//----------------------------------------------------------------------------//

export const creatProducts = async (idUser: number, cost_price: number, product_value: number, product_description: string, qt_itens: number, product_cod: number) => {

    try{
        const products = await productsMysql.create(
            {
                cost_price,
                product_value,
                product_description,
                qt_itens,
                product_cod,
                UserMysql_id: idUser
            });
        return products;
    }catch(err){
        return new Error('Erro no service creatProducts.')
    }
    
};

//-----------------------------------------------------------------------------//

export const listProducts = async (id: number) => {

    try {

        const getProducts = await productsMysql.findAll({ where: { UserMysql_id: id, productSold: false } });

        const productMoreQtd = await productsMysql.findOne({
            where: { UserMysql_id: id },
            order: [['qt_itens', 'DESC']],
            limit: 1
        });

        const productMoreDear = await productsMysql.findOne({
            where: { UserMysql_id: id },
            order: [['product_value', 'DESC']],
            limit: 1
        });


        return { getProducts, productMoreQtd, productMoreDear };

    } catch (err) {
        return new Error('Erro em services.listProducts')
    }
};

//------------------------------------------------------------------------------//

export const deleteIdProducts = async (id: string) => {
    let product = await productsMysql.destroy({ where: { id } });
    return product;
};


//----------------------------------------------------------//

export const productSold = async (id: string) => {

    try {
        if (id) {
            console.log(id + 'id<======================== services')

            const productUpdate = await productsMysql.update(
                {
                    productSoldQtd: Sequelize.literal('CASE WHEN qt_itens > 0 THEN productSoldQtd + 1 ELSE productSoldQtd END'),
                    qt_itens: Sequelize.literal('CASE WHEN qt_itens > 0 THEN qt_itens - 1 ELSE 0 END')

                },
                {
                    where: { id },
                    returning: true
                }
            );
        
            return productUpdate;
        }
    } catch (err) {
        return new Error('Error no services productSold!')
    }
};


export const getProductSold = async (id: number) => {

    const getAllProductsSold = await productsMysql.findAll({ where: { productSoldQtd: { [Op.gt]: 0 }, UserMysql_id: id } });

    const getMoreSold = await productsMysql.findOne({
        where: { UserMysql_id: id },
        order: [['productSoldQtd', 'DESC']],
        limit: 1
    });

    return { getAllProductsSold, getMoreSold };
};
