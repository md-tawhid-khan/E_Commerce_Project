import { Router } from "express";
import { productController } from "./product.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "../../../../generated/prisma/enums";

const router = Router() ;

router.post('/create',authTokenValidation(userRole.ADMIN), productController.createProduct) ;

router.get('/',authTokenValidation(userRole.USER,userRole.ADMIN) , productController.getAllProduct) ;

router.get('/:id',authTokenValidation(userRole.USER,userRole.ADMIN), productController.getSingleProduct) ;

router.patch('/update/:id',authTokenValidation(userRole.ADMIN), productController.updateProduct) ;

router.delete('/delete/:id',authTokenValidation(userRole.ADMIN), productController.deleteProduct) ;

export const productRouter = router ;