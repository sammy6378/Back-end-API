
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { Client } from "pg";

import "dotenv/config";
import { drizzle as drizzlenode } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const dbs = drizzle(sql);


// local database
export const client = new Client({
    connectionString: process.env.Database_url as string,
    ssl:false
})

const main = async() =>{
    await client.connect();
}

main();

const db = drizzlenode(client,{schema,logger:true})

export default db;


