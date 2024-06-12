
import { getOwner,createOwner,deleteOwner,updateOwner,searchOwner } from "./owner.service";
import { getController, createController, deleteController, updateController,searchController } from "../generics/gen.controller";

// restraunt table
export const getOwnerN = getController(getOwner);
export const createOwnerN = createController(createOwner);
export const deleteOwnerN = deleteController(getOwner,deleteOwner);
export const updateOwnerN = updateController(getOwner,updateOwner);
export const searchOwnerN = searchController(searchOwner);
