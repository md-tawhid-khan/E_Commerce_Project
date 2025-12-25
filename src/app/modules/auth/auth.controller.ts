import { Request, Response } from "express";
import { authServices } from "./auth.services";

const authLongin = async (req:Request,res:Response) =>{
    const loginData = req.body.data ;
    
    const result = await authServices.authLongin(loginData);
    res.send(result) ;
} ;

export const authController = {
    authLongin
}