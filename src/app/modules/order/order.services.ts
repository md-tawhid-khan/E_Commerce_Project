import { prisma } from "../../../lib/prisma";

const createOrder = async (orderData:any) =>{

    // console.log(orderData) ;

    const orderInfo = {
        user_id : orderData.user_id ,
        totalAmount : 0 
    }

  

    

    try {
        const result = await prisma.$transaction(async (tx)=>{
         const generateOrder = await tx.order.create({
            data:orderInfo
         }) ;

         const orderItemsInfo =  orderData.products.map((product:any)=>({
        order_id:generateOrder.id,
        product_id:product.product_id,
        quantity:product.quantity,
        price:product.price,
        subtotal:product.quantity * product.price 
    })) ;

    const generatedOrderItems = await tx.orderItem.createMany({
        data:orderItemsInfo
    }) ;
    
    const calculateTotalAmount  = await tx.orderItem.aggregate({
  where: { order_id:generateOrder.id},
  _sum: { subtotal: true },
})

// console.log(calculateTotalAmount) ;

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
        
    } catch (error) {
        console.log(error) ;
    }

    
} ;

export const orderServices = {
    createOrder
} ;