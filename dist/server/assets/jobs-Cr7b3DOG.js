import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-D4hjqEwP.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/jobs/index.tsx
var $$splitComponentImporter = () => import("./jobs-B6G4ynoX.js");
var searchSchema = z.object({ type: z.enum([
	"full-time",
	"part-time",
	"remote",
	"contract"
]).optional() });
var getJobs = createServerFn({ method: "GET" }).inputValidator(searchSchema).handler(createSsrRpc("94176f119135bec989f9d97e49296808f691d79d2b9872c0c7334a4d33e6ccdf"));
var Route = createFileRoute("/jobs/")({
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => ({ type: search.type }),
	loader: async ({ deps }) => ({ jobs: await getJobs({ data: { type: deps.type } }) }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
