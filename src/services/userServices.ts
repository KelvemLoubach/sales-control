import { UserMysql } from '../models/modelMysql';
import bcrypt from 'bcrypt';




export const serviceCreateUser = async (firstName: string, lastName: string, email: string, password: string) => {

    const passwordHash = await bcrypt.hash(password, 12);

    console.log(passwordHash);

    try{
     const  [newUser, create] = await UserMysql.findOrCreate({
        where: { email },
        defaults: {
            firstName,
            lastName,
            email,
            password: passwordHash
        }
    });

    console.log(newUser, create+`<-- create`);
    let userExistingOrcreate = false;

    if( newUser.email === email && create === false){
        return userExistingOrcreate;  
    }else{
        return userExistingOrcreate = true;
    }

 } catch(error){
    console.error(`Erro ao criar usuário ${error}`);
 }
 
};

//----------------------------------------------------------------------------//

export const login= async (email: string, password: string) => {

    try{
    const userVerification = await UserMysql.findOne({where:{email}});

    console.log(userVerification)

    let matchPassword = false;

    if(userVerification){
        matchPassword = await bcrypt.compare(password, userVerification.password);
        console.log(matchPassword+'  senha verificacao')
      return  matchPassword === true ? true : false;

    }else{
        return new Error('Usuário não encontrado!')
    }
 } catch(error){
    console.error(`Error --> ${error}`)
 }
};