import { Request, Response } from "express";

export const home =  (req:Request, res:Response) => {
    res.send('oi');
};

export const createNewAccount = (req:Request, res:Response) => {
    res.render('newAccount');
    const { firstName, lastName, nameUser, email, password } = req.body;
    
}; 