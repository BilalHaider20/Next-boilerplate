import mysql from 'mysql2/promise';
import { drizzle as drizzleMySql } from 'drizzle-orm/mysql2';
import { migrate as migrateMySql } from 'drizzle-orm/mysql2/migrator';

import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import path from 'path';

import * as schema from '@/models/Schema';

import { Env } from './Env';

let connection;
let drizzle;

if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD && Env.DATABASE_URL) {
  connection = await mysql.createConnection({
    uri: Env.DATABASE_URL,
  });

  drizzle = drizzleMySql(connection, {schema,mode:'default'} );
  await migrateMySql(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
} else {
  const global = globalThis as unknown as { connection: mysql.Connection };

  if (!global.connection) {
    global.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Update these credentials
      database: 'bookmeauthentication', // Update to your database name
    });
  }

  drizzle = drizzleMySql(global.connection,{ schema, mode: 'default' });
  await migrateMySql(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
}


export const db = drizzle;
