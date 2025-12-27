// import express from "express"
import bodyParser from "body-parser"
import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router() ;

router.post('/payment_intents',paymentController.paymentInitialization) ;

router.post('/verify',paymentController.verifyPayment)

router.post('/webhook',  bodyParser.raw({ type: "application/json" }),paymentController.webhookIntrigation) ;

export const paymentRouter = router ;