import { productStatus } from "../../../generated/prisma/enums";


export type TProduct = {
    name : string ,
    sku : string ,
    description : string , 
    price : number , 
    stock : number , 
    status : productStatus
} ;

export type TUpdateProduct = Partial<TProduct>