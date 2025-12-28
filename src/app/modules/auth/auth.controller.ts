import { Request, Response } from "express";
import { authServices } from "./auth.services";
import status from "http-status";

const authLongin = async (req:Request,res:Response) =>{
    try {
        const loginData = req.body.data ;
    
    const result = await authServices.authLongin(loginData);
  
    res.cookie("accessToken", result.accessToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax", 
  maxAge: 24 * 60 * 60 * 1000, 
});
    res.send({
        status:status.OK,
        success:true,
        message : " log in successfully ",
        data : result 
    }) ;
    } catch (error : any) {
          res.send({
        status:status[404],
        success:false,
        message : " failed to log in  ",
        data : error.message 
    }) ;
    }
} ;

export const authController = {
    authLongin
} ;