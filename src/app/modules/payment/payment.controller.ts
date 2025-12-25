import { Request, Response } from "express";
import { paymentServices } from "./payment.services";
import status from "http-status";

const paymentInitialization = async(req:Request, res:Response) =>{
    try {
        const result = await paymentServices.paymentInitialization();
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
    } ;
} ;

export const paymentController ={
    paymentInitialization
} ;