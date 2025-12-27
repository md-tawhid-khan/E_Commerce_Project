import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";
import { productRouter } from "../modules/product/product.router";
import { orderRouter } from "../modules/order/order.router";
import { paymentRouter } from "../modules/payment/payment.router";


const router=Router();

const routerModules=[
    {
        path : "/user",
        routerSource : userRouter,
    } ,
    {
        path : "/user",
        routerSource : authRouter,
    },
    {
        path : "/product",
        routerSource : productRouter
    },
    {
        path : "/order" ,
        routerSource : orderRouter
    },
    {
        path : "/payment",
        routerSource : paymentRouter 
    }
   
]

routerModules.forEach(route=>router.use(route.path,route.routerSource))

export default router