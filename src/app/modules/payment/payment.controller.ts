import { Request, Response } from "express";
import { paymentServices } from "./payment.services";
import status from "http-status";


const paymentInitialization = async(req:Request, res:Response) =>{
    try {
      
        const orderId=req.query.order_id as string ;
       
        const result = await paymentServices.paymentInitialization(orderId);
          res.send({
        status:status.OK,
        success:true,
        message : " create client secret successfully ",
        data : result 
    }) ; 
    } catch (error:any) {
         res.send({
        status:status[404],
        success:false,
        message : " failed to create client secret  ",
        data : error.message 
    }) ;
    } ;
} ;

const verifyPayment = async(req:Request,res:Response)=>{
       try {
    const { paymentIntent } = req.body

    const result = await paymentServices.verifyPayment(paymentIntent)

    console.log(result) ;

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }

} ;

const webhookIntrigation = async(req:Request,res:Response) =>{
try{
  const sig = req.headers['stripe-signature'];
  const data = req.body ;

  const result= await paymentServices.webhookIntrigation(data,sig) ;
  res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const paymentController ={
    paymentInitialization,
    verifyPayment,
    webhookIntrigation
} ;