
import db from '../drizzle/db'
import { eq } from "drizzle-orm";
import { state, usersTable } from '../drizzle/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { dbs } from '../drizzle/db'

export const getUsers = async (id: number) => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

export const createUsers = async (res:any)=> {
     await db.insert(usersTable).values(res)
        return "User created successfully"
}

// deleting a restraunt table
export const deleteUsers = async (id:number):Promise<boolean>=>{
    await db.delete(usersTable).where(eq(usersTable.id,id)).returning()
    return true
 }

 
export const updateUsers = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(usersTable).set(res).where(eq(usersTable.id, id))
    return "User updated successfully";
}

  export async function fetchUserById(id: number): Promise<Response> {
    const db = dbs;
    const [oneUser] = await db.select().from(state).where(eq(state.id, id));
    return new Response(JSON.stringify({ post: oneUser }));
  }