
import db from '../drizzle/db'
import { eq } from "drizzle-orm";
import { restaurant,TIRestraunt, usersTable } from '../drizzle/schema';


export const getrestraunt = async (id: number) => {
    return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, id)
    })
}

export const createRestraunt = async<T>(res:any)=> {
     await db.insert(restaurant).values(res)
        return "Restraunt created successfully"
}

// deleting a restraunt table
export const deleteRestraunt = async (id:number):Promise<boolean>=>{
    await db.delete(restaurant).where(eq(restaurant.id,id)).returning()
    return true
 }

//  updating a restaurant
export const updateRestraunt = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(restaurant).set(res).where(eq(restaurant.id, id))
    return "User updated successfully";
}

// searching method
export const searchRestraunt = async (id:number) => {
    return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, id)
    })
}

