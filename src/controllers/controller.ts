import { Request, Response } from "express";
import * as services from '../services/userServices';
import { tokenJwt } from "../middlewares/middleware";
import { productsInstances, userInstance } from '../models/modelMysql';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


export const home = (req: Request, res: Response) => {
    return res.status(200).json({ OK: 'Página home!' })
};


//----------------------------------------------------------------------------//

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({OK: `Você saiu!`})
};


//----------------------------------------------------------------------------//

export const products = async (req: Request, res: Response) => {

    const id = tokenJwt(req, res) as number;
  
    const productsData = await services.listProducts(id);

    if (!(productsData instanceof Error)) {

        return res.status(200).json({ OK: `Seus produtos cadastrados: ${productsData.getProducts.length}` })

    } else {
        return new Error('ERRO EM PRODUCTS')
    }
};


//----------------------------------------------------------------------------//


export const soldProduct = async (req: Request, res: Response) => {

    const id = tokenJwt(req, res) as number;

    const DataReturnProductSold = await services.getProductSold(id);
    const allProductsDescription = DataReturnProductSold.getAllProductsSold.map( item => item.product_description);

    return res.status(200).json({OK: `Produtos vendidos: ${allProductsDescription.join(' - ')} `});
};

//----------------------------------------------------------------------------//

export const productsPost = async (req: Request, res: Response) => {

    try {
        const { cost_price, product_value, product_description, qt_itens, product_cod } = req.body as productsInstances;
        const description = product_description.toLowerCase();

        const id = tokenJwt(req, res) as number;
        
        if (typeof id !== undefined) {

            const products = await services.creatProducts(id, cost_price, product_value, description, qt_itens, product_cod);

            if( !(products instanceof Error)){
                return res.status(201).json({ OK: `Produtos criados: ${products.product_description}` });
            }
           
        } else {
            return res.status(401).json({ ERROR: `erro em products post` })
        }

    } catch (err) {
        return res.status(500).json({ ERROR: `${err}` })
    }

};


//---------------------------------------------------------------------------//

export const loginPost = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body as userInstance;
        const emailLower = email.toLowerCase();

        if (emailLower && password) {

            const verification = await services.login(emailLower, password);

            if (verification === null || verification === undefined) {

                return res.status(401).json({ OK: 'Usuário não cadastrado!' })

            } 
            else if (verification.matchPassword as boolean) {

                const token = jwt.sign({ id: verification.id }, process.env.JWT_SECRET_KEY as string)
            
                res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60000 * 1 }); // Token válido por 1 minuto!

                return res.status(201).json({ OK: ` Login post correto! TOKEN ${token}` })
            } else {

                return res.status(401).json({ ERROR: 'ERROR login post, password or email incorrect' })
            }
        };

        return res.status(400).json({ ERROR: 'Email or password not existing' })

    } catch (err) {
        return new Error('Erro no controller, função de login! ' + err)
    };

};

//----------------------------------------------------------------------------//

export const signupPost = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body as userInstance;
   
    try {
        const verification = await services.serviceCreateUser(firstName, lastName, email, password);

        if (verification === undefined) {

            return res.status(500).json({ ERROR: 'erro interno!' });

        } else {

            if (verification.create === false) {
                return res.status(200).json({ OK: `Usuário já existe: ${verification.newUser.email}` });
            } else {

                return res.status(201).json({ OK: `Usuário criado com sucesso: ${verification.newUser.email}` });
            };
        };
    }

    catch (err) {
        return res.status(400).json({ Error: 'Preencha os campos!' });
    };
};

//-----------------------------------------------------------------------------//


export const deleteProducts = async (req: Request, res: Response) => {
    
    if(req.params.id){

    const idProducts = req.params.id as string;

    let product = await services.deleteIdProducts(idProducts);
  
    if(product > 0){

    return res.status(200).json({OK: `Produto deletado!`})

    }else{
        return res.status(200).json({OK: `Produto já deletado!`})
    }
    }else{
        return res.status(200).json({ERROR: `Produto não encontrado!`})
    }
};

//------------------------------------------------------------------------------//

export const productSold = async (req: Request, res: Response) => {

    const { id } = req.params;

    const product = await services.productSold(id);
    
    if(  product instanceof Array ){

    const affected = product[1];

    if(affected){
       
        return res.status(201).json({OK: `${affected} produto marcado como vendido!`});

    }else {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }  
    }else {
        return res.status(200).json({OK: `Error`})
    }
};
