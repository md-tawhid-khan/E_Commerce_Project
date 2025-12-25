import { Router } from "express";
import { productController } from "./product.controller";

const router = Router() ;

router.post('/create', productController.createProduct) ;

router.patch('/update/:id', productController.updateProduct) ;

export const productRouter = router ;