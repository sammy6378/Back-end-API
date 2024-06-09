import "dotenv/config";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import db, {client} from "./db";

async function migration(){
    console.log("====== migration Started ====")
    await migrate(db, {migrationsFolder:__dirname + "/migrations"})
    await client.end()
    console.log("====== migration Ended ====")
    process.exitCode = 0;
}

migration();