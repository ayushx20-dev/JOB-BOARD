// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
    Outlet,
    HeadContent,
    Scripts,
    createRootRouteWithContext,
    Link,
} from "@tanstack/react-router";

import "../styles/app.css";
import { createServerFn } from "@tanstack/react-start";
import { getCurrentSession } from "../lib/get-session";

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
    return getCurrentSession();
});

export const Route = createRootRouteWithContext()({
    beforeLoad: async () => {
        const session = await fetchSession();
        return { session };
    },
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "TanStack Start Starter",
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    const { session } = Route.useRouteContext();

    return (
        <RootDocument>
            <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl text-blue-600">
                    JobBoard
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/jobs"
                        className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                        Browse Jobs
                    </Link>

                    {session?.user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="text-gray-600 text-sm">
                                My Listings
                            </Link>
                            <Link
                                to="/jobs/new"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                Post a Job
                            </Link>
                            <img
                                src={session.user.image ?? ""}
                                alt={session.user.name ?? "User"}
                                className="w-8 h-8 rounded-full"
                            />
                            <a href="/api/auth/signout" className="text-sm text-gray-500">
                                Sign out
                            </a>
                        </div>
                    ) : (
                        <a
                            href="/api/auth/signin"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Sign in with GitHub
                        </a>
                    )}
                </div>
            </nav>

            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body className="bg-gray-200 min-h-screen">
                {children}
                <Scripts />
            </body>
        </html>
    );
}