import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../../lib/prisma";
import { paymentStatus } from "../../../../generated/prisma/enums";

const paymentInitialization = async()=>{
    const stripe = new Stripe(config.stripe_secret as string);
    // console.log(stripe) ;

    const orderInfo = await prisma.order.findFirst({
        where:{
            id:"e4e63e69-353d-4a0b-8c23-6f4e4eb3e77d"
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



}
export const paymentServices = {
    paymentInitialization
}