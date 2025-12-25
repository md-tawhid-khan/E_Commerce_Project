import { prisma } from "../../../lib/prisma";
import { generateToken } from "../../helper/tokenHelper";
import { TAuth } from "./auth.interface";


const authLongin= async (payload:TAuth) =>{

    const userData=await prisma.user.findUnique({
        where:{
            email:payload.email,
        }
    }) ;
    if(!userData){
      throw new Error ("you have no registered account !") ;
    } ;

   let isCorrectPassword ;
   if(payload.password === userData.password){
     isCorrectPassword = true ;
   }

   if(!isCorrectPassword){
    throw new Error ("password is not correct") ;
   }
    
    const payloadData={
        name : userData.name ,
        email : userData.email ,
        role :userData.role
    }
     
 const accessToken =await generateToken(payloadData);
 
//  console.log(accessToken) ;
 
    return {
        accessToken
    }
}

export const authServices = {
    authLongin
}