import { Request, Response } from "express";
import * as services from '../services/userServices';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const home = (req: Request, res: Response) => {
    res.render('__login')
};

//----------------------------------------------------------------------------//

export const products = async (req: Request, res: Response) => {

    const idUser = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY as string); 
    
    if (typeof idUser === 'string') {
        throw new Error('Token inválido');
      };

      console.log(idUser.id+'<------------ id do usuario logado ')

    const products = await services.listProducts(idUser.id);

    
    console.log(products+ '<-------- todos os produtos')

    return res.render('__checkout',{products});
};

//----------------------------------------------------------------------------//

export const login = (req: Request, res: Response) => {
    res.render('__login');
};

//----------------------------------------------------------------------------//

export const signup = (req: Request, res: Response) => {
    res.render('__newAccount')
};

//---------------------------------------------------------------------------//

export const productsPost = async (req:Request, res:Response) => {

    try{
    const {cost_price, product_value, product_description, qt_itens, product_cod } = req.body;
    const idUser = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY as string); 
    
    if (typeof idUser === 'string') {
        throw new Error('Token inválido');
      };

    await services.creatProducts(idUser.id, cost_price, product_value, product_description, qt_itens, product_cod);

     return res.redirect('/products');

    } catch (err){
        res.status(401).send(err)
    }

};


//---------------------------------------------------------------------------//

export const loginPost = async (req:Request, res:Response) => {

    try{

    const {email, password} = req.body;
    console.log(email, password+'<---------------- email password')

    if(email && password){

        const verification = await services.login(email,password);

        if(  verification === null || verification === undefined ){

            const showMessageCreateAccount = true;

            return res.render('__login',{
                showMessageCreateAccount
            });

        } else if(verification instanceof Error){

            return res.status(400).send(`Error --> ${Error}`)
        }
        else if(verification?.matchPassword){
        
           const token = jwt.sign({id:verification.id}, process.env.JWT_SECRET_KEY as string)
           console.log(token);

            res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60000*15}); // Token válido por 15 minutos!
            
           return res.redirect('/products'); 
        } else{
            const noMatchPassword = true;

            return res.render('__login',{
                noMatchPassword
            })
        }
    };

    return res.send('ERROR aqui')

} catch(err){
    return new Error('Erro no controller, função de login! ')
};

};

//----------------------------------------------------------------------------//

export const signupPost = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;

    try{
        const verification = await services.serviceCreateUser(firstName, lastName, email, password);
        
        if(!verification){
           return res.redirect('/');
        }else {
            return res.redirect('/products')
        }  
    } 
    
    catch (err){
    return res.json({ Error: 'Preencha os campos!' });
    }
};

//-----------------------------------------------------------------------------//


export const deleteProducts =  async (req:Request, res:Response) => {
    const idProducts = req.body.id;

    console.log(idProducts+'<------------------ id');

    const deleteId = await services.deleteIdProducts(idProducts);
    return res.redirect('/products');
};

//------------------------------------------------------------------------------//

export const productSold = async (req:Request, res:Response) => {

    const {id} = req.params;
    console.log(id+'<======== sold');
    services.productSold(id);

    return res.redirect('/products')
};
