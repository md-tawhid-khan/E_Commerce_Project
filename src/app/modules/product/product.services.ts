import { prisma } from "../../../lib/prisma";
import { TProduct, TUpdateProduct } from "./product.interface";

const createProduct = async (payload:TProduct) => {

    const sku = payload.sku ;

    const isAlreadyExistSku = await prisma.product.findUnique({
        where:{
            sku : sku 
        }
    })

    if(isAlreadyExistSku){
        throw new Error("your SKU information is not unique") ;
    }

    const result = await prisma.product.create({
        data:payload
    })
     return result ;
} ;


 
const getAllProduct = async()=>{
    
    const result = await prisma.product.findMany();
    return result ;
} ;



const getSingleProduct = async(productId:string) =>{

    

    const result = await prisma.product.findUnique({
        where:{
            id : productId 
        }
    }) ;
    return result ;
}



const updateProduct = async (payload : TUpdateProduct,productId : string) =>{
    
    const result = await prisma.product.update({
        where:{
            id:productId
        },
        data:{
           ...payload
        }
    }) ;
    return result ;
}



const deleteProduct = async (productId:string) =>{
    const result = await prisma.product.delete({
        where:{
            id : productId
        }
    }) ;

    return result ;
}
export const productServices ={
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}