import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-D4hjqEwP.js";
/* empty css             */
import { t as Route$4 } from "./dashboard-CkmfWyAn.js";
import { t as Route$5 } from "./jobs-Cr7b3DOG.js";
import { t as Route$6 } from "./_jobId-ZRCMV_RK.js";
import { t as authConfig } from "./auth-B3DFAshx.js";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { StartAuthJS } from "start-authjs";
//#region src/routes/__root.tsx
var fetchSession$1 = createServerFn({ method: "GET" }).handler(createSsrRpc("8ca68a78cb68399107cccece277a4ee8fb04a249ee2a1193bf3ec65b0df7039d"));
var Route$3 = createRootRouteWithContext()({
	beforeLoad: async () => {
		return { session: await fetchSession$1() };
	},
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "TanStack Start Starter" }
	] }),
	component: RootComponent
});
function RootComponent() {
	const { session } = Route$3.useRouteContext();
	return /* @__PURE__ */ jsxs(RootDocument, { children: [/* @__PURE__ */ jsxs("nav", {
		className: "bg-white border-b px-6 py-4 flex items-center justify-between",
		children: [/* @__PURE__ */ jsx(Link, {
			to: "/",
			className: "font-bold text-xl text-blue-600",
			children: "JobBoard"
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "/jobs",
				className: "text-gray-600 hover:text-gray-900 text-sm",
				children: "Browse Jobs"
			}), session?.user ? /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/dashboard",
						className: "text-gray-600 text-sm",
						children: "My Listings"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/jobs/new",
						className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium",
						children: "Post a Job"
					}),
					/* @__PURE__ */ jsx("img", {
						src: session.user.image ?? "",
						alt: session.user.name ?? "User",
						className: "w-8 h-8 rounded-full"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/api/auth/signout",
						className: "text-sm text-gray-500",
						children: "Sign out"
					})
				]
			}) : /* @__PURE__ */ jsx("a", {
				href: "/api/auth/signin",
				className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium",
				children: "Sign in with GitHub"
			})]
		})]
	}), /* @__PURE__ */ jsx(Outlet, {})] });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", { children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
		className: "bg-gray-200 min-h-screen",
		children: [children, /* @__PURE__ */ jsx(Scripts, {})]
	})] });
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$1 = () => import("./routes-CvfmCWlm.js");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/jobs/new.tsx
var $$splitComponentImporter = () => import("./new-DtZFQZ2P.js");
var fetchSession = createServerFn({ method: "GET" }).handler(createSsrRpc("260bd1b09819111173ce3bd631b7989afe91943ea2f7ebc6802470b0c275cf5b"));
var Route$1 = createFileRoute("/jobs/new")({
	beforeLoad: async () => {
		const session = await fetchSession();
		if (!session?.user) throw redirect({ to: "/" });
		return { session };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routes/api/auth/$.tsx
var auth = StartAuthJS(authConfig);
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.GET({ request }),
	POST: ({ request }) => auth.POST({ request })
} } });
//#endregion
//#region src/routeTree.gen.ts
var DashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$3
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$3
});
var JobsIndexRoute = Route$5.update({
	id: "/jobs/",
	path: "/jobs/",
	getParentRoute: () => Route$3
});
var JobsNewRoute = Route$1.update({
	id: "/jobs/new",
	path: "/jobs/new",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute,
	JobsJobIdRoute: Route$6.update({
		id: "/jobs/$jobId",
		path: "/jobs/$jobId",
		getParentRoute: () => Route$3
	}),
	JobsNewRoute,
	JobsIndexRoute,
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		context: { session: null }
	});
}
//#endregion
export { getRouter };
