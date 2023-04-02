import { UserMysql, productsMysql, userInstance } from '../models/modelMysql';
import Sequelize, {Op, where} from 'sequelize';
import bcrypt from 'bcrypt';




export const serviceCreateUser = async (firstName: string, lastName: string, email: string, password: string) => {

    const passwordHash = await bcrypt.hash(password, 12);

    console.log(passwordHash);

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

        console.log(newUser, create + `<-- create`);
        let userExistingOrcreate = false;

        if (newUser.email === email && create === false) {
            return userExistingOrcreate;
        } else {
            return userExistingOrcreate = true;
        }

    } catch (error) {
        console.error(`Erro ao criar usuário ${error}`);
    }

};

//----------------------------------------------------------------------------//

export const login = async (email: string, password: string) => {


    try {
        const userVerification = await UserMysql.findOne({ where: { email } });

        console.log(userVerification)
        let matchPassword = false;

        if (userVerification) {

            const id = userVerification.id;
            
            matchPassword = await bcrypt.compare(password, userVerification.password);
            matchPassword ? true : false;
            console.log(matchPassword+'<======== matchpassword')
            return { matchPassword, id };

        } else {
            const showMessageCreateAccount = null;
            return showMessageCreateAccount;
        }
    } catch (error) {
        console.error(`Error --> ${error}`)
    }
};

//----------------------------------------------------------------------------//

export const creatProducts = async (idUser: string, cost_price: string, product_value: string, product_description: string, qt_itens: string, product_cod: string) => {

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
};

//-----------------------------------------------------------------------------//

export const listProducts = async (id: string) => {

    try{
 
    const getProducts = await productsMysql.findAll({ where: { UserMysql_id: id, productSold:false} });

    const productMoreQtd = await productsMysql.findOne({where:{UserMysql_id:id},
        order: [['qt_itens', 'DESC']],
        limit: 1
      });

      const productMoreDear = await productsMysql.findOne({where:{UserMysql_id:id},
        order: [['product_value', 'DESC']],
        limit: 1
      });

    
    return {getProducts, productMoreQtd,productMoreDear};

    } catch(err){
        return new Error('Erro em services.listProducts')
    }
};

//------------------------------------------------------------------------------//

export const deleteIdProducts = async (id: string) => {

    try {
        const deleteForId = await productsMysql.findOne({ where: { id } });
        if (deleteForId) {
            deleteForId.destroy();
        }
        console.log(deleteForId + '<---------- aquiii')
        return;

    } catch (err) {
        return new Error('Erro no service.deleteIdProducts')
    }
};

//----------------------------------------------------------//

export const productSold = async (id:string) => {

    try{
        if(id){
    //const sold = await productsMysql.update({productSoldQtd:true},{where:{id}});
   const productUpdate = await productsMysql.update(
        {
          productSoldQtd: Sequelize.literal('CASE WHEN qt_itens > 0 THEN productSoldQtd + 1 ELSE productSoldQtd END'),  
          qt_itens: Sequelize.literal('CASE WHEN qt_itens > 0 THEN qt_itens - 1 ELSE 0 END')
         
        },
        {
          where: { id }
        }
      );
    return productUpdate;
        }
    } catch(err){
        return new Error('Error no services productSold!')
    }
};


export const getProductSold = async (id:string) => {

    const getAllProductsSold = await productsMysql.findAll({where:{productSoldQtd:{[Op.gt]:0},UserMysql_id:id}});

    const getMoreSold = await productsMysql.findOne({where:{UserMysql_id:id},
        order: [['productSoldQtd', 'DESC']],
        limit: 1
      });

        return {getAllProductsSold, getMoreSold};
};
