import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkAccess = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ ERROR: `Token não encontrado!` })
    }

    try {
        const [typeToken, token] = req.headers.authorization.split(' ')

        if (typeToken === 'Bearer') {

            const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            typeof user !== 'string' ? next() : res.json({ ERROR: 'Inválido!' });
        }

    } catch (err) {
        return res.status(401).json({ ERROR: `Token inválido!` })
    }
};


export const tokenJwt = (req: Request, res: Response) => {

    try {

        if (req.headers.authorization) {
            const [typeToken, token] = req.headers.authorization.split(' ')

            const idUser = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

            if (typeof idUser === 'string') {
                throw new Error('Token inválido');
            };

            const id: number = idUser.id;
            console.log(id + 'id do middleware jwt')
            return id;
        };

    } catch (err) {
        return res.status(500).json({ ERROR: `${err}` })
    }
};
