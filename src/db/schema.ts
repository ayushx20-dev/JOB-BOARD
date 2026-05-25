import {
    pgTable, text, timestamp, uuid, integer, primaryKey, boolean
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from '@auth/core/adapters'

export const users = pgTable('user', {
    // Auth.js expects a text ID, not a uuid — it generates its own via crypto.randomUUID()
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
})

export const accounts = pgTable(
    'account',
    {
        userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    // accounts needs a compound primary key — provider + providerAccountId together are unique
    (account) => [
        { compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }) },
    ]
)

export const sessions = pgTable('session', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => [
        { compositePk: primaryKey({ columns: [vt.identifier, vt.token] }) },
    ]
)

export const jobs = pgTable('jobs', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    company: text('company').notNull(),
    location: text('location').notNull(),
    type: text('type').notNull(),         // 'full-time' | 'part-time' | 'remote' | 'contract'
    salary: text('salary'),                 // optional — e.g. '$80k – $120k'
    description: text('description').notNull(),
    contactEmail: text('contact_email').notNull(),
    // references users.id — links each job to the person who posted it
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Job = typeof jobs.$inferSelect
export type NewJob = typeof jobs.$inferInsert