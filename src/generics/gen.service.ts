// services/generic.service.ts
import { eq } from "drizzle-orm";
import db from '../drizzle/db';

type TableName = keyof typeof db.query;

export const getEntity = async <T>(table: TableName, id: number): Promise<T | undefined> => {
    return await db.query[table].findFirst({
        where: eq(table.id, id)
    });
};

export const createEntity = async <T extends { [x: string]: any; }>(table: any, data: T): Promise<string> => {
    await db.insert(table).values(data);
    return `${table} created successfully`;
};

export const deleteEntity = async <T>(table: any, id: number): Promise<boolean> => {
    await db.delete(table).where(eq(table.id, id)).returning();
    return true;
};

export const updateEntity = async <T extends { [x: string]: any; }>(table: any, id: number, data: T): Promise<string> => {
    await db.update(table).set(data).where(eq(table.id, id));
    return `${table} updated successfully`;
};
