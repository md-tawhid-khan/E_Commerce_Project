import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../../lib/prisma";
import { paymentStatus } from "../../../../generated/prisma/enums";

const stripe = new Stripe(config.stripe_secret as string);

const paymentInitialization = async(orderId:string)=>{
    
    // console.log(stripe) ;

    const orderInfo = await prisma.order.findFirst({
        where:{
            id:orderId
        }}
        )
        // console.log(orderInfo);

        if (!orderInfo?.id) {
  throw new Error("Order ID is missing");
}

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await stripe.paymentIntents.create({
  amount: orderInfo?.totalAmount as number,
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

const verifyPayment = async(paymentIntentId: string) =>{
   if (!paymentIntentId) {
    throw new Error("PaymentIntent ID is required")
  }

  //  Verify from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId
  )

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not successful")
  }

  // 🔄 UpdatePayment status
   const updatedPayment = await prisma.payment.update({
    where: {
      transaction_id: paymentIntentId,
    },
    data: {
      status: paymentStatus.SUCCESS,
      raw_response: JSON.parse(JSON.stringify(paymentIntent)),
    },
  })

  // (Optional but recommended)
  await prisma.order.update({
    where: {
      id: updatedPayment.order_id,
    },
    data: {
      status: "PAID",
    },
  })

    return updatedPayment

}

// using webhook to control payment system 

const webhookIntrigation = async(payload:any,sig:any)=>{
  const endpointSecret : string =config.stripe_webhooks_secret as string ;

  
  const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  
  // console.log({event}) ;

   switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;

    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment failed:", paymentIntent.id)
      break
    }  

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return {receive:true}
  
}


export const paymentServices = {
    paymentInitialization,
    verifyPayment,
    webhookIntrigation
}