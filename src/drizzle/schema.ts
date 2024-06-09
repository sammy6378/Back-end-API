import { decimal as dc, boolean as bl, date as d,serial,pgTable,text,varchar,integer} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";



// city table
export const city = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    state_id: integer("state_id").notNull().references(()=>state.id, {onDelete:"cascade"})
  });

   // state table
   export const state = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    code:varchar("code")
  });

  
//   restraunt table
export const restaurant = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  street_address: varchar("street_address"),
  zip_code: varchar("zip_code"),
  city_id: integer("city_id").references(()=>city.id,{onDelete:"cascade"}),
  created_at: d("created_at"),
  updated_at: d("updated_at")
});

 // address table
 export const addressTable = pgTable('Address', {
  id: serial("id").primaryKey(),
  streetAddress1: varchar("street_address_1").notNull(),
  streetAddress2: varchar("street_address_2"),
  zipCode: varchar("zip_code").notNull(),
  deliveryInstructions: varchar("delivery_instructions"),
  userId: integer("user_id").notNull(),
  cityId: integer("city_id").notNull().references(()=>city.id,{onDelete:"cascade"}),
  createdAt: d("created_at"),
  updatedAt: d("updated_at")
});

 // restraunt-owner table
 export const restrauntOwner = pgTable("restraunt_owner", {
  id: serial("id").primaryKey(),
  restrauntid: integer("restraunt_id").notNull().references(()=>restaurant.id,{onDelete:"cascade"}),
  ownerid:integer("owner_id")
});


// menu items table
export const menu_item = pgTable("menu_item", {
  id:serial("id").primaryKey(),
  name:varchar("name"),
  restaurant_id: integer("restaurant_id").notNull().references(()=>restaurant.id,{onDelete:"cascade"}),
  category_id: integer("category_id").notNull().references(()=>category.id,{onDelete:"cascade"}),
  description: varchar("description"),
  ingredients: varchar("ingredients"),
  price: dc("price"),
  active: bl("active"),
  created_at: d("created_at"),
  updated_at: d("updated_at")
});


//   category table
export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

  // order_menu_item table
  export const orderMenuItemTable = pgTable('OrderMenuItem', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => ordersTable.id, { onDelete: "cascade" }).notNull(),
    menuItemId: integer("menu_item_id").references(() => menu_item.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").notNull(),
    itemPrice: dc("item_price").notNull(),
    price: dc("price").notNull()
});

// orders table
export const ordersTable = pgTable('Orders',{
  id:serial("id").primaryKey(),
  restrauntId:integer("restraunt_id").notNull().references(()=>restaurant.id,{onDelete:"cascade"}),
  estimatedTime:d("estimated_delivery_time"),
  actualTime:d("actual_delivery_time"),
  deliveryAddress:integer("delivery_address").notNull(),
  userId:integer("user_id"),
  driverId:integer("driver_id"),
  price:dc("price"),
  discount:dc("discount"),
  finalPrice:dc("final_price"),
  comment:varchar("comment"),
  createAt:d("create_at"),
  updatedAt:d("updated_at")
})

// users table
   // users table
   export const usersTable = pgTable('users', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    contactPhone: varchar("contact_phone").notNull(),
    phoneVerified: bl("phone_verified"),
    email: varchar("email").notNull(),
    emailVerified: bl("email_verified"),
    confirmationCode: varchar("confirmation_code").notNull(),
    password: varchar("password").notNull(),
    createdAt: d("created_at"),
    updatedAt: d("updated_at"),
});

// comment table
export const commentTable = pgTable('Comment', {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => ordersTable.id, { onDelete: "cascade" }).notNull(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  commentText: varchar("comment_text").notNull(),
  isComplaint: bl("is_complaint"),
  isPraise: bl("is_praise"),
  createdAt: d("created_at"),
  updatedAt: d("updated_at")
});

 // driver table
 export const driverTable = pgTable('Driver', {
  id: serial("id").primaryKey(),
  carMake: varchar("car_make").notNull(),
  carModel: varchar("car_model").notNull(),
  carYear: integer("car_year").notNull(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  online: bl("online"),
  delivering: bl("delivering"),
  createdAt: d("created_at"),
  updatedAt: d("updated_at")
});

// order status table
export const orderStatusTable = pgTable('OrderStatus', {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => ordersTable.id, { onDelete: "cascade" }).notNull(),
  statusCatalogId: integer("status_catalog_id").references(() => statusCatalogTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: d("created_at")
});

// status catalogue
export const statusCatalogTable = pgTable("status_catalog",{
  id:serial("id").primaryKey(),
  name:varchar("name")
})

// end of tables

  // relations

  // city state relations
  export const stateRelations = relations(state,({one}) => ({
    state:one(city,{fields:[state.id],references:[city.state_id]})
  }))

  export const cityRelations = relations (city,({many}) => ({
    cities:many(state),
    restaurants:many(restaurant)
  }))

  // city restraunt relations
  export const restaurantRelations = relations(restaurant,({one,many}) => ({
    city:one(city,{fields:[restaurant.city_id],references:[city.id]}),
    order:one(ordersTable,{fields:[restaurant.id],references:[ordersTable.restrauntId]}),
    menuitems:many(menu_item),
    orders:many(ordersTable)
  }))

  // restraunt menu-item relations
  export const menuItemRelations = relations(menu_item,({one,many}) => ({
    restaurant:one(restaurant,{fields:[menu_item.restaurant_id],references:[restaurant.id]}),
    category:one(category,{fields:[menu_item.category_id],references:[category.id]}),
    orders:many(orderMenuItemTable)
  }))

  export const categoryRelations = relations (category,({many}) => ({
    categories:many(menu_item)
  }))

  // menu-item and order-menu-item relationships
  export const orderMenuItemRelations = relations(orderMenuItemTable,({one}) => ({
    order:one(ordersTable,{fields:[orderMenuItemTable.orderId],references:[ordersTable.id]}),
    menuItem:one(menu_item,{fields:[orderMenuItemTable.menuItemId],references:[menu_item.id]})
  }))

  // orders relations
export const ordersRelations = relations(ordersTable,({one,many})=>({
  order:one(restaurant,{fields:[ordersTable.restrauntId],references:[restaurant.id]}),
  status:one(orderStatusTable,{fields:[ordersTable.id],references:[orderStatusTable.orderId]}),
  drivers:many(driverTable),
  addreses:many(addressTable),
  users:many(usersTable),
  orders:many(orderMenuItemTable),
  orderStatus:many(orderStatusTable)
}))

// users relation
export const usersRelations = relations(usersTable,({one,many})=>({
  user:one(restrauntOwner,{fields:[usersTable.id],references:[restrauntOwner.ownerid]}),
  order:one(ordersTable,{fields:[usersTable.id],references:[ordersTable.userId]}),
  comment:one(commentTable,{fields:[usersTable.id],references:[commentTable.userId]}),
  driver:one(driverTable,{fields:[usersTable.id],references:[driverTable.userId]}),
  address:one(addressTable,{fields:[usersTable.id],references:[addressTable.userId]}),
  comments:many(commentTable),
  drivers:many(driverTable)
}))

// status catalogue relations
export const statusCatalogRelations = relations(statusCatalogTable,({one,many})=>({
  status:one(orderStatusTable,{fields:[statusCatalogTable.id],references:[orderStatusTable.statusCatalogId]}),
  orderstatus:many(orderStatusTable)
}))

// driver relations
export const driverRelations = relations(driverTable,({one,many})=>({
  order:one(ordersTable,{fields:[driverTable.id],references:[ordersTable.driverId]}),
  users:one(usersTable,{fields:[driverTable.userId],references:[usersTable.id]})
}))

// comments table
export const commentsRelations = relations(commentTable,({one,many})=>({
  order:one(ordersTable,{fields:[commentTable.id],references:[ordersTable.id]}),
  users:one(usersTable,{fields:[commentTable.userId],references:[usersTable.id]}),
}))

// restraunt owner
export const ownerRelations = relations(restrauntOwner,({one})=>({
  order:one(usersTable,{fields:[restrauntOwner.ownerid],references:[usersTable.id]})
}))

// addresses table

export const addressRelations = relations(addressTable,({one})=>({
  order:one(ordersTable,{fields:[addressTable.id],references:[ordersTable.id]})
}))

// order status relations

export const orderStatusRelations = relations(orderStatusTable,({one})=>({
  order:one(ordersTable,{fields:[orderStatusTable.orderId],references:[ordersTable.id]}),
  status:one(statusCatalogTable,{fields:[orderStatusTable.statusCatalogId],references:[statusCatalogTable.id]})
}))
// order menu item relations

// end of relations

export type TIRestraunt = typeof restaurant.$inferInsert;
export type TSRestraunt = typeof restaurant.$inferSelect;
export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;