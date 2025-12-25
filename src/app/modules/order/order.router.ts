import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router() ;

router.post("/create-Order", orderController.createOrder) ;

export const orderRouter = router ;