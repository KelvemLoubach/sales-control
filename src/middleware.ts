import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkAccess = (req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).render('__login');
    }

    try{
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
   
    if(user !== 'string'){
        next()
    };
    
    } catch(err) {
        return res.status(401).send('token inválido!')
    }
};

