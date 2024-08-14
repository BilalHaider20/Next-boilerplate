import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const userSchema = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(), // Use int with autoincrement for MariaDB
  username: varchar('username', { length: 255 }).notNull(),
  body: varchar('body', { length: 1000 }).notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()  // Default to current timestamp
    .onUpdateNow() // Update timestamp on row update
    .notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()  // Default to current timestamp
    .notNull(),
});
