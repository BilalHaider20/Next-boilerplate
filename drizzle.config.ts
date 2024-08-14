/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'migrations',
  schema: './src/models/Schema.ts',
  dialect: 'mysql', 
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'Bookme_auth',
    password: 'Bookme123',
    database: 'bookme_auth',
  },
  verbose: true,
  strict: true,
});
