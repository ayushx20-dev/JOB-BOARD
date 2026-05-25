import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-D4hjqEwP.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/jobs/$jobId.tsx
var $$splitNotFoundComponentImporter = () => import("./_jobId-DRQx-9iT.js");
var $$splitComponentImporter = () => import("./_jobId-b_kwY4vj.js");
var getJob = createServerFn({ method: "GET" }).inputValidator((id) => id).handler(createSsrRpc("788967db3fe914cf133af0f2b71c65c60f875f9e92d35dfaa3663b6a6da38721"));
var Route = createFileRoute("/jobs/$jobId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params: { jobId } }) => {
		return { job: await getJob({ data: jobId }) };
	},
	validateSearch: (search) => ({}),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
