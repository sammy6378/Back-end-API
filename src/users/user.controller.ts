import { getUsers, createUsers, deleteUsers, updateUsers } from "../users/user.service";
import { getController, createController, deleteController, updateController,searchController } from "../generics/gen.controller";
// users table

export const getUsersN = getController(getUsers);
export const createUsersN = createController(createUsers);
export const deleteUsersN = deleteController(getUsers, deleteUsers);
export const updateUsersN = updateController(getUsers, updateUsers);