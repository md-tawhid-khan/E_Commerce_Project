

import { prisma } from "../../../lib/prisma";
import { TUser } from "./user.interface";



const createUser= async (user:TUser)=>{
    console.log(user) ;
    const result = await prisma.user.create({data:user});
    return result ;
   
}

export const userServices ={
    createUser
} ;