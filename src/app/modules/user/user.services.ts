
import  bcrypt  from 'bcrypt';

import { prisma } from "../../../lib/prisma";
import { TUser } from "./user.interface";



const createUser= async (user:TUser)=>{
    // console.log(user) ;
    const {password,email} = user ;

    const isEmailExist = prisma.user.findUniqueOrThrow({where:{
            email:email,           
        }})

        if((await isEmailExist).email){
            throw new Error("you have allready an account");
        }


    const hashedPassword=bcrypt.hashSync(password, 12) ;
    const userData ={
        name : user.name ,
        email:user.email,
        password : hashedPassword 
    } as TUser ;
    const result = await prisma.user.create({data:userData});
    return result ;
   
}

export const userServices ={
    createUser
} ;