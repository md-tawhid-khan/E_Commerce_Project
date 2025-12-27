import { Router } from "express";
import { orderController } from "./order.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "../../../../generated/prisma/enums";

const router = Router() ;


router.post("/create-Order", authTokenValidation(userRole.USER), orderController.createOrder) ;
router.get("/my-order", authTokenValidation(userRole.USER), orderController.getMyOrder) ;


export const orderRouter = router ;