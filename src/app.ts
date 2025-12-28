import bodyParser  from 'body-parser';

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import status from 'http-status';
import cookieParser from 'cookie-parser' ;
import router from './app/routers';
import { paymentController } from './app/modules/payment/payment.controller';



const app:Application=express() ;

app.use(cors({
       origin: "http://localhost:3000", 
    credentials: true,}
 )) ;

app.use(cookieParser())


app.post(
  "/api/v1/payment/webhook",
  bodyParser.raw({ type: "application/json" }),
  paymentController.webhookIntrigation
);


app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;





app.get('/',(req:Request,res:Response)=>{
       res.send({
        message:'E_Commerce Server'
       });
});

app.use('/api/v1',router)






app.use((req:Request,res:Response,next:NextFunction)=>{
       res.status(status.NOT_FOUND).json({
              success:false,
              message:'api not found',
              error:{
                     path:req.originalUrl,
                     message:'your requested path is not found'
              }
       })
})


export default app ;