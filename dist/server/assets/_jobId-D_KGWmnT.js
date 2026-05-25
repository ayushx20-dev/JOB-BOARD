import { r as jobs, t as db } from "./db-BZXs6VQ3.js";
import { t as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { notFound } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
//#region src/routes/jobs/$jobId.tsx?tss-serverfn-split
var getJob_createServerFn_handler = createServerRpc({
	id: "788967db3fe914cf133af0f2b71c65c60f875f9e92d35dfaa3663b6a6da38721",
	name: "getJob",
	filename: "src/routes/jobs/$jobId.tsx"
}, (opts) => getJob.__executeServer(opts));
var getJob = createServerFn({ method: "GET" }).inputValidator((id) => id).handler(getJob_createServerFn_handler, async ({ data: id }) => {
	const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
	if (!result[0]) throw notFound();
	return result[0];
});
//#endregion
export { getJob_createServerFn_handler };
