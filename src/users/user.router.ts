import { getUsersN,createUsersN,deleteUsersN,updateUsersN} from "./user.controller"
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";

export const userRouter = new Hono();
// users table
userRouter.get("/users/:id",getUsersN)
userRouter.post("/users",zValidator('json',userSchema,(result,c)=>{
    if(!result.success) return c.json(result.error,400)
}),createUsersN)
userRouter.put("/users/:id",updateUsersN)