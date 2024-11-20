import { pgTable, serial, text, timestamp, uuid, numeric } from 'drizzle-orm/pg-core';

export const requests = pgTable('requests', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  itemDescription: text('item_description').notNull(),
  fromAirport: text('from_airport').notNull(),
  toAirport: text('to_airport').notNull(),
  deliveryDate: timestamp('delivery_date').notNull(),
  reward: numeric('reward').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});