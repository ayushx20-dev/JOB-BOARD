import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { StartAuthJSConfig } from "start-authjs";
import { db } from "./src/db";
import { users, accounts, sessions, verificationTokens } from "./src/db/schema";

export const authConfig: StartAuthJSConfig = {
  secret: process.env.AUTH_SECRET,

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }) as any,
  ],

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};
