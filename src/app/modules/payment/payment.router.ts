import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router() ;

router.post('/payment_intents',paymentController.paymentInitialization) ;

export const paymentRouter = router ;