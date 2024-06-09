
import { Context } from "hono";
import { getEntity, createEntity, deleteEntity, updateEntity,searchEntity } from "./gen.func";

// get a controller
export const getController = <T>(getFunction: (id: number) => Promise<T | undefined>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const entity = await getEntity(id, getFunction);
    if (entity === undefined) {
        return c.text("Entity not found", 404);
    }
    return c.json(entity, 200);
}

// create a new controller
export const createController = <T>(createFunction: (data: T) => Promise<T>) => async (c: Context) => {
    try {
        const data = await c.req.json();
        const createdEntity = await createEntity(data, createFunction);

        if (!createdEntity) return c.text("Entity not created", 404);
        return c.json({ msg: createdEntity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// delete controller
export const deleteController = <T>(getFunction: (id: number) => Promise<T | undefined>, deleteFunction: (id: number) => Promise<boolean>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const entity = await getEntity(id, getFunction);
        if (entity === undefined) return c.text("Entity not found", 404);

        const deleted = await deleteEntity(id, deleteFunction);
        if (!deleted) return c.text("Entity not deleted", 404);

        return c.json({ msg: entity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// update controller
export const updateController = <T>(getFunction: (id: number) => Promise<T | undefined>, updateFunction: (id: number, data: T) => Promise<T | undefined>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const data = await c.req.json();

    try {
        const entity = await getEntity(id, getFunction);
        if (entity === undefined) return c.text("Entity not found", 404);

        const updatedEntity = await updateEntity(id, data, updateFunction);
        if (!updatedEntity) return c.text("Entity not updated", 404);

        return c.json({ msg: updatedEntity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// search a controller
export const searchController = <T>(getFunction: (id: number) => Promise<T | undefined>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const entity = await searchEntity(id, getFunction);
    if (entity === undefined) {
        return c.text("Entity not found", 404);
    }
    return c.json(entity, 200);
}