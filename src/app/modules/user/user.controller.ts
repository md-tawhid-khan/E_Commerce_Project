import { Request, Response } from "express";
import { userServices } from "./user.services";


const createUser = async (req :Request,res:Response)=>{
    const user = req.body.user ;
    const result = await userServices.createUser(user);
    res.send(result) ;
}

export const userController = {
    createUser
} ;