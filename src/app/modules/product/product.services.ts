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

// get all product ------
 
const getAllProduct = async()=>{
    console.log("get all products") ;
    const result = await prisma.product.findMany();
    return result ;
} ;

// get single product ----------

const getSingleProduct = async(productId :string) =>{
    const result = await prisma.product.findUniqueOrThrow({
        where:{
            id : productId 
        }
    }) ;
    return result ;
}

// update product -------

const updateProduct = async (payload : TUpdateProduct,productId : string) =>{
    // console.log(payload) ;
    // console.log(productId) ;
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

// delete product -------------

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