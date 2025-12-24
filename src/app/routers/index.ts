import { Router } from "express";
import { userRouter } from "../modules/user/user.router";


const router=Router();

const routerModules=[
    {
        path : "/user",
        routerSource : userRouter,
    }
]

routerModules.forEach(route=>router.use(route.path,route.routerSource))

export default router