import { Router } from "express";
import { productController } from "./product.controller";
import authTokenValidation from "../../middleware/authTokenValidation";
import { userRole } from "../../../../generated/prisma/enums";

const router = Router() ;

router.post('/create',authTokenValidation(userRole.ADMIN), productController.createProduct) ;

router.get('/' , productController.getAllProduct) ;

router.get('/:id', productController.getSingleProduct) ;

router.patch('/update/:id', productController.updateProduct) ;

router.delete('/delete/:id', productController.deleteProduct) ;

export const productRouter = router ;