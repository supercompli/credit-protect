import {pgTable,text,integer,bigint,index} from 'drizzle-orm/pg-core';
export const workspaces=pgTable('workspaces',{owner:text('owner').primaryKey(),data:text('data').notNull(),version:integer('version').notNull().default(0)});
// expires is epoch milliseconds, which overflows a 32-bit integer.
export const sessions=pgTable('sessions',{id:text('id').primaryKey(),owner:text('owner').notNull(),role:text('role').notNull(),org:text('org').notNull(),expires:bigint('expires',{mode:'number'}).notNull()});
export const enquiries=pgTable('enquiries',{id:text('id').primaryKey(),owner:text('owner').notNull(),kind:text('kind').notNull(),data:text('data').notNull(),created:text('created').notNull()},table=>[index('enquiries_owner_created').on(table.owner,table.created)]);
export const limits=pgTable('limits',{key:text('key').primaryKey(),count:integer('count').notNull().default(0)});
