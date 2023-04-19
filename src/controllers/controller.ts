import { Request, Response } from "express";
import * as services from '../services/userServices';
import { userInstance } from '../models/modelMysql';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


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

export const home = (req: Request, res: Response) => {
    return res.status(200).json({ OK: 'Página home!' })
};


//----------------------------------------------------------------------------//

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({OK: `Você saiu!`})
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