import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/db/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	accounts: () => accounts,
	jobs: () => jobs,
	sessions: () => sessions,
	users: () => users,
	verificationTokens: () => verificationTokens
});
var users = pgTable("user", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image")
});
var accounts = pgTable("account", {
	userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
	type: text("type").$type().notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state")
}, (account) => [{ compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }) }]);
var sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull()
});
var verificationTokens = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: "date" }).notNull()
}, (vt) => [{ compositePk: primaryKey({ columns: [vt.identifier, vt.token] }) }]);
var jobs = pgTable("jobs", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	company: text("company").notNull(),
	location: text("location").notNull(),
	type: text("type").notNull(),
	salary: text("salary"),
	description: text("description").notNull(),
	contactEmail: text("contact_email").notNull(),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull()
});
var db = drizzle(neon(process.env.DATABASE_URL), { schema: schema_exports });
//#endregion
export { users as a, sessions as i, accounts as n, verificationTokens as o, jobs as r, db as t };
