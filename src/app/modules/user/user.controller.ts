import { Request, Response } from "express";
import { userServices } from "./user.services";
import status from "http-status";


const createUser = async (req :Request,res:Response)=>{
    try {
        const user = req.body.data ;
    const result = await userServices.createUser(user);
    res.send({
        status:status.OK,
        success:true,
        message : " user registration  successful ",
        data : result 
    }) ;
    } catch (error:any) {
         res.send({
        status:status[404],
        success:false,
        message : " failed to registration  ",
        data : error.message 
    }) ;
    }
    
}

export const userController = {
    createUser
} ;