import bodyParser from "body-parser"
// import express from "express"

import { Router } from "express";
import { paymentController } from "./payment.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "../../../generated/prisma/enums";

const router = Router() ;

router.post('/payment_intents',paymentController.paymentInitialization) ;

router.post('/verify',paymentController.verifyPayment) ;

router.get('/my-payment', authTokenValidation(userRole.USER),paymentController.getMyPayment) ;

export const paymentRouter = router ;

