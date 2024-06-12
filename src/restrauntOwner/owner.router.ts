import { Hono } from "hono";
import { getOwnerN,createOwnerN,updateOwnerN,deleteOwnerN,searchOwnerN } from "./owner.controller";
import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validators";


export const ownerRouter = new Hono();

// restraunt table
ownerRouter.get("/owner/:id", getOwnerN)
ownerRouter.post("/owner", createOwnerN)
ownerRouter.delete("/owner/:id",deleteOwnerN)
ownerRouter.put("/owner/:id",updateOwnerN)
ownerRouter.get("/owner/:id",searchOwnerN)