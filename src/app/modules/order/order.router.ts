import { Router } from "express";
import { orderController } from "./order.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "../../../../generated/prisma/enums";

const router = Router() ;

router.post("/create-Order",authTokenValidation(userRole.USER), orderController.createOrder) ;

export const orderRouter = router ;