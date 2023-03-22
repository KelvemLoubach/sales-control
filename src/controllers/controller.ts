import { Request, Response } from "express";
import * as services from '../services/userServices';


export const home = (req: Request, res: Response) => {
    res.send('oi ');
};

//----------------------------------------------------------------------------//

export const userCreate = (req: Request, res: Response) => {
    res.send('Usuario criado')
};

//----------------------------------------------------------------------------//

export const existingUser = (req: Request, res: Response) => {
    res.render('__login');
};

//----------------------------------------------------------------------------//

export const userCreateAccount = (req: Request, res: Response) => {
    res.render('__newAccount')
};

//---------------------------------------------------------------------------//

export const loginValidation = async (req:Request, res:Response) => {

    const {email, password} = req.body;

    if(email && password){
        const verification = await services.login(email,password);

        if(verification instanceof Error){
            res.status(400).send(`Error --> ${Error}`)
        }
        else if(verification){
            console.log(verification)
            return  res.render('__index');
        }else{
           return res.send(`Erro de senha ou email: --> ${console.error(Error)}`)
        }
    };
    console.log(email, password)
    return res.send('ERROR aqui')
};

//----------------------------------------------------------------------------//

export const createNewAccount = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;

    if (firstName || lastName || email || password) {
        const verification = await services.serviceCreateUser(firstName, lastName, email, password);
        
        if(!verification){
           return res.redirect('/existingUser');
        }else {
            return res.redirect('/userCreate')
        }  
    }
    return res.json({ Error: 'Preencha os campos!' })
}