import { Request, Response } from "express";
import { productServices } from "./product.services";
import status from "http-status";

const createProduct = async (req:Request,res:Response)=>{
    try {
        const result = await productServices.createProduct() ;
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
} ;

export const productController = {
    createProduct
}