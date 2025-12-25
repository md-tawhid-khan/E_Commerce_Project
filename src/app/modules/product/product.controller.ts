import { Request, Response } from "express";
import { productServices } from "./product.services";
import status from "http-status";

const createProduct = async (req:Request,res:Response)=>{
    try {
        const productData = req.body.data ;
        // console.log(productData) ;
        const result = await productServices.createProduct(productData) ;
        res.send({
        status:status.OK,
        success:true,
        message : "product create successfully ",
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

const updateProduct = async(req:Request,res:Response)=>{
    try {
        const productId = req.params.id as string;
        
        const updateData = req.body.data ;
         const result = await productServices.updateProduct(updateData,productId) ;
        res.send({
        status:status.OK,
        success:true,
        message : "product update successfully ",
        data : result 
    }) ;
    } catch (error :any) {
           res.send({
        status:status[404],
        success:false,
        message : " failed to update  ",
        data : error.message 
    }) ;
    }
}

export const productController = {
    createProduct,
    updateProduct
}