import { Request, Response } from "express";
import * as services from '../services/userServices';
import { tokenJwt } from "../middlewares/middleware";
import { productsInstances } from '../models/modelMysql';
import dotenv from 'dotenv';

dotenv.config();

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
