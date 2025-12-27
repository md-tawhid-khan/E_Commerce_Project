import { Request, Response } from "express";
import { orderServices } from "./order.services";
import status from "http-status";


const createOrder = async (req:Request,res:Response)=>{
    try {
        const orderData = req.body.data ;
         const userEmail =  (req as any).user?.data?.email;
         
        const result = await orderServices.createOrder(orderData,userEmail)
          res.send({
        status:status.OK,
        success:true,
        message : " order is created successful ",
        data : result 
    }) ; 

    } catch (error:any) {
        res.send({
        status:status[404],
        success:false,
        message : " failed to create order  ",
        data : error.message 
    }) ;
    }
} ;

export const orderController = {
    createOrder
}