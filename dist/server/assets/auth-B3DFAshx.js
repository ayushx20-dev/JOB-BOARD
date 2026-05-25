import { a as users, i as sessions, n as accounts, o as verificationTokens, t as db } from "./db-BZXs6VQ3.js";
import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
//#region auth.ts
var authConfig = {
	secret: process.env.AUTH_SECRET,
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	providers: [GitHub({
		clientId: process.env.GITHUB_ID,
		clientSecret: process.env.GITHUB_SECRET
	})],
	callbacks: { session({ session, user }) {
		if (session.user) session.user.id = user.id;
		return session;
	} }
};
//#endregion
export { authConfig as t };
