import { Request, Response } from "express";
import { orderServices } from "./order.services";
import status from "http-status";


const createOrder = async (req:Request,res:Response)=>{
    try {
        const {products} =await req.body.data ;
        
         const userEmail =  (req as any).user?.data?.email;
         
        const result = await orderServices.createOrder(products,userEmail)
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

const getMyOrder = async (req:Request,res:Response)=>{
    try {
        const userEmail = req?.user?.data?.email ;
        
         const result = await orderServices.getMyOrder(userEmail) ;
          res.send({
        status:status.OK,
        success:true,
        message : "my order retrive successfully ",
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
}

export const orderController = {
    createOrder,
    getMyOrder
}