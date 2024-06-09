import { Hono } from "hono";
import { getRestrauntN,createRestrauntN,deleteRestrauntN,updateRestrauntN,searchRestrauntN} from "./main.controller"
import { getUsersN,createUsersN,deleteUsersN,updateUsersN,getUser} from "./main.controller"
// import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validators";


export const userRouter = new Hono();


// restraunt table
userRouter.get("/restraunt/:id", getRestrauntN)
userRouter.post("/restraunt", createRestrauntN)
userRouter.delete("/restraunt/:id",deleteRestrauntN)
userRouter.put("/restraunt/:id",updateRestrauntN)
userRouter.get("/restraunt/:id",searchRestrauntN)

// users table
// userRouter.get("/users/:id",getUsersN)
// userRouter.post("/users",createUsersN)
// userRouter.put("/users/:id",updateUsersN)
userRouter.get("/state/:id",getUser)