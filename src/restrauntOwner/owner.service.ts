
import db from '../drizzle/db'
import { eq } from "drizzle-orm";
import { driversTable} from '../drizzle/schema';


export const getOwner = async (id: number) => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}

export const createOwner = async<T>(res:any)=> {
     await db.insert(driversTable).values(res)
        return "Restraunt Owner created successfully"
}

// deleting a restraunt table
export const deleteOwner = async (id:number):Promise<boolean>=>{
    await db.delete(driversTable).where(eq(driversTable.id,id)).returning()
    return true
 }

//  updating a restaurant
export const updateOwner = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(driversTable).set(res).where(eq(driversTable.id, id))
    return "Restraunt Owner updated successfully";
}

// searching method
export const searchOwner = async (id:number) => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}
