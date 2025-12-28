import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../../lib/prisma";
import { paymentStatus } from "../../../../generated/prisma/enums";

const stripe = new Stripe(config.stripe_secret as string);

const paymentInitialization = async(orderId:string)=>{

    const orderInfo = await prisma.order.findFirst({
        where:{
            id:orderId
        }}
        )
        if (!orderInfo?.id) {
  throw new Error("Order ID is missing");
}

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await stripe.paymentIntents.create({
  amount: orderInfo?.totalAmount * 100 as number,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});

// console.log(paymentIntent) ;

const paymentInfo = await prisma.payment.create({
    data:{
        order_id:orderInfo?.id ,
        provider : "stripe",
        transaction_id :paymentIntent.id,
        status : paymentStatus.PENDING,
        raw_response: JSON.parse(JSON.stringify(paymentIntent)),
    }
})

// console.log(paymentInfo);
return {
  clientSecret: paymentIntent.client_secret,
  paymentIntentId: paymentIntent.id,
}

} ;

// ---------------------------

const verifyPayment = async(paymentIntentId: string) =>{
   if (!paymentIntentId) {
    throw new Error("PaymentIntent ID is required")
  }

  //  Verify from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId
  )

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not successful or payment failed")
  }

    return {success:true}

}

// using webhook to control payment system 

const webhookIntrigation = async(payload:any,sig:any)=>{
  const endpointSecret : string =config.stripe_webhooks_secret as string ;

  
  const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
 



   switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

       // Update payment record
      await prisma.payment.updateMany({
        where: { transaction_id: paymentIntent.id },
        data: {
          status: paymentStatus.SUCCESS,
          raw_response: JSON.parse(JSON.stringify(paymentIntent)),
        },
      });

       // Update order record
      const paymentRecord = await prisma.payment.findUnique({
        where: { transaction_id: paymentIntent.id },
      });

      if (paymentRecord) {
     const updatedOrder=   await prisma.order.update({
          where: { id: paymentRecord.order_id },
          data: { status: "PAID" },
        });

        

        const orderItems = await prisma.orderItem.findMany({
  where: { order_id: updatedOrder.id }
})

for (const item of orderItems) {
  await prisma.product.update({
    where: {
      id: item.product_id
    },
    data: {
      stock: {
        decrement: item.quantity
      }
    }
  })
}


      }

    
      break;



    case 'payment_method.attached':
      const paymentMethod = event.data.object;

      console.log('PaymentMethod was attached to a Customer!');
      break;



    // ... handle other event types

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      await prisma.payment.updateMany({
        where: { transaction_id: paymentIntent.id },
        data: { status: paymentStatus.FAILED },
      });

      break
    }  

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return {receive:true}
  
} ;

//  --------- bkash payment intregation   ------------------

const createBkashPayment=async()=>{
  console.log("create payment")
}



// ----------------------------

const getMyPayment = async (userEmail:string) =>{
  const isExistUser=await prisma.user.findUnique({
    where:{
      email:userEmail
    }
  }) ;
  if(!isExistUser){
    throw new Error("you are not authorized user ") ;
  } ;

  const myPaymentInfo = await prisma.payment.findMany({
    where:{
      order:{
        user_id:isExistUser.id
      }
    }
  })



  return myPaymentInfo ;

}


export const paymentServices = {
    paymentInitialization,
    verifyPayment,
    webhookIntrigation,
    getMyPayment,
    createBkashPayment
}