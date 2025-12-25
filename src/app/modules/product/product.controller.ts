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
        message : " failed to create product ",
        data : error.message 
    }) ;  
    }
} ;

// get all product ----------

const getAllProduct = async (req:Request,res:Response)=>{
    try {
        const result = await productServices.getAllProduct();
          res.send({
        status:status.OK,
        success:true,
        message : "product retrive successfully ",
        data : result 
    }) ;
    } catch (error:any) {
        res.send({
        status:status[404],
        success:false,
        message : " failed to get all product  ",
        data : error.message 
    }) ;
    }
}

// get single product -----------

const getSingleProduct = async(req:Request, res:Response) => {
     try {
        const productId = req.params.id as string ;
        const result = await productServices.getSingleProduct(productId)
        res.send({
        status:status.OK,
        success:true,
        message : "product retrive successfully ",
        data : result 
    }) ;
        
     } catch (error:any) {
         res.send({
        status:status[404],
        success:false,
        message : " failed to get specific  product  ",
        data : error.message 
    }) ;
     }
} ;

// udpate product --------

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

// delete product --------------

const deleteProduct = async (req:Request, res:Response)=>{
    try {
        const productId = req.params.id as string;
    const result = await productServices.deleteProduct(productId) ;
      res.send({
        status:status.OK,
        success:true,
        message : "product delete successfully ",
        data : result 
    }) ;
    } catch (error:any) {
          res.send({
        status:status[404],
        success:false,
        message : " failed to delete  ",
        data : error.message 
    }) ;
    }
}

export const productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}