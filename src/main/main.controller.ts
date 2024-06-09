
import { Context } from "hono";
// import { getEntity, createEntity, deleteEntity, updateEntity } from "../generics/gen.func";
import { getrestraunt, createRestraunt, deleteRestraunt, updateRestraunt,searchRestraunt } from "../services/restraunt.service";
import { getController, createController, deleteController, updateController,searchController } from "../generics/gen.controller";
import { getUsers, createUsers, deleteUsers, updateUsers,fetchUserById } from "../services/user.service";

// restraunt table
export const getRestrauntN = getController(getrestraunt);
export const createRestrauntN = createController(createRestraunt);
export const deleteRestrauntN = deleteController(getrestraunt, deleteRestraunt);
export const updateRestrauntN = updateController(getrestraunt, updateRestraunt);
export const searchRestrauntN = searchController(searchRestraunt);

// users table
export const getUsersN = getController(getUsers);
export const createUsersN = createController(createUsers);
export const deleteUsersN = deleteController(getUsers, deleteUsers);
export const updateUsersN = updateController(getUsers, updateUsers);
// from neon database
export const getUser = async (c:Context):Promise<Response>=>{
    try{
        const id = parseInt(c.req.param('id'));
        const response = await fetchUserById(id);
        console.log(response);
        return c.json(response);
      }
        catch (error: any) {
          return c.json({ error: error?.message }, 400);
      }
}