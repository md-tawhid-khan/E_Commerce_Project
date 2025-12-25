import { Router } from "express";
import { productController } from "./product.controller";

const router = Router() ;

router.post('/create', productController.createProduct) ;

router.get('/' , productController.getAllProduct) ;

router.get('/:id', productController.getSingleProduct) ;

router.patch('/update/:id', productController.updateProduct) ;

router.delete('/delete/:id', productController.deleteProduct) ;

export const productRouter = router ;