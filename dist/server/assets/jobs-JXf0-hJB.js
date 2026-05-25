import { r as jobs, t as db } from "./db-BZXs6VQ3.js";
import { t as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
//#region src/routes/jobs/index.tsx?tss-serverfn-split
var searchSchema = z.object({ type: z.enum([
	"full-time",
	"part-time",
	"remote",
	"contract"
]).optional() });
var getJobs_createServerFn_handler = createServerRpc({
	id: "94176f119135bec989f9d97e49296808f691d79d2b9872c0c7334a4d33e6ccdf",
	name: "getJobs",
	filename: "src/routes/jobs/index.tsx"
}, (opts) => getJobs.__executeServer(opts));
var getJobs = createServerFn({ method: "GET" }).inputValidator(searchSchema).handler(getJobs_createServerFn_handler, async ({ data }) => {
	if (data.type) return db.select().from(jobs).where(eq(jobs.type, data.type)).orderBy(desc(jobs.createdAt));
	return db.select().from(jobs).orderBy(desc(jobs.createdAt));
});
//#endregion
export { getJobs_createServerFn_handler };
