import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router() ;

router.post('/:id/payment_intents',paymentController.paymentInitialization) ;

router.post('/verify',paymentController.verifyPayment)

export const paymentRouter = router ;