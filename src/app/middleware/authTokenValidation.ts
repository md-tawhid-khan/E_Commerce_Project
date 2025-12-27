import  jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config';
import status from 'http-status';


export let userInformation : any ; 

const authTokenValidation= (...userRoles:string[])=>{



  return async(req:Request ,res:Response,next:NextFunction)=>{
       try {

        const  token=req.headers.authorization ;
       if(!token){
        throw new Error("You are not authorized !!!") ;
       };

       const secret = config.secret ;

       const verifiedUser=jwt.verify(token,secret as Secret) as JwtPayload;
       
      //  console.log(verifiedUser) ;

       userInformation=verifiedUser ;

       if(userRoles && !userRoles.includes(verifiedUser?.data?.role )){
         return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have access",
        });
       }

      next() ;
        
    } catch (error:any) {
         res.send({
        status:status[404],
        success:false,
        message : " you are not authorized user ",
        data : error.message 
    }) ;
    }

}

}

export default authTokenValidation ;