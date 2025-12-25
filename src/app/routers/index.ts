import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";


const router=Router();

const routerModules=[
    {
        path : "/user",
        routerSource : userRouter,
    } ,
    {
        path : "/user",
        routerSource : authRouter,
    }
]

routerModules.forEach(route=>router.use(route.path,route.routerSource))

export default router