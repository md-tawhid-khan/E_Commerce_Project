import { prisma } from "../../../lib/prisma";
import { TProduct } from "./product.interface";

const createProduct = async (payload:TProduct) => {

    const sku = payload.sku ;

    const isAlreadyExistSku = await prisma.product.findUniqueOrThrow({
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
}


export const productServices ={
    createProduct
}