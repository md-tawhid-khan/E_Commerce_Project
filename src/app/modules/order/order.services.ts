
import { prisma } from "../../../lib/prisma";

const createOrder = async (orderData:any, userEmail : string) =>{
    
        const result = await prisma.$transaction(async (tx)=>{
        const existUser= await tx.user.findUnique({
            where:{
                email:userEmail 
            } 
        }) ;

     if(!existUser){
        throw new Error("you are not authorized user") ;
     }



         const generateOrder = await tx.order.create({
            data:{
                user_id:existUser.id ,
                totalAmount: 0 
            }
         }) ;

         const orderItemsInfo =  orderData?.products?.map((product:any)=>({
        order_id:generateOrder.id,
        product_id:product.product_id,
        quantity:product.quantity,
        price:product.price,
        subtotal:product.quantity * product.price  
    })) ;

    

     await tx.orderItem.createMany({
        data:orderItemsInfo
    }) ;
    
    const calculateTotalAmount  = await tx.orderItem.aggregate({
  where: { order_id:generateOrder.id},
  _sum: { subtotal: true },
})



    const updateOrder = await tx.order.update({
        where:{
            id:generateOrder.id
        },
        data:{
            totalAmount: calculateTotalAmount._sum.subtotal ?? 0          
        }
    })

         
         return updateOrder ;
    }) ;

    return result ;
        
  
} ;

const getMyOrder = async(userEmail:string)=>{
   
    const isExistUser = await prisma.user.findUnique({
        where:{
            email:userEmail
        }
    }) ;
    if(!isExistUser){
        throw new Error("you are not authorized user") ;
    } ;

    const myOrder = await prisma.order.findMany({
        where:{
            user_id:isExistUser.id
        }
    }) ;
  
    return myOrder ;
}



export const orderServices = {
    createOrder,
    getMyOrder
} ;