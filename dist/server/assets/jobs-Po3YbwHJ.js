import { r as jobs, t as db } from "./db-BZXs6VQ3.js";
import { t as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { t as getCurrentSession } from "./get-session-BGEPhOSi.js";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
//#region src/server/jobs.ts?tss-serverfn-split
var jobSchema = z.object({
	title: z.string().min(1, "Title is required"),
	company: z.string().min(1, "Company is required"),
	location: z.string().min(1, "Location is required"),
	type: z.enum([
		"full-time",
		"part-time",
		"remote",
		"contract"
	]),
	salary: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	contactEmail: z.string().email("Invalid email address")
});
var createJob_createServerFn_handler = createServerRpc({
	id: "1a22b5891cbc77fe84018554231c045f4cc1c2e3c7fc2cc0dc10bd336a42e6b6",
	name: "createJob",
	filename: "src/server/jobs.ts"
}, (opts) => createJob.__executeServer(opts));
var createJob = createServerFn({ method: "POST" }).inputValidator(jobSchema).handler(createJob_createServerFn_handler, async ({ data }) => {
	const session = await getCurrentSession();
	if (!session?.user?.id) throw new Error("Unauthorized");
	const [newJob] = await db.insert(jobs).values({
		title: data.title,
		company: data.company,
		location: data.location,
		type: data.type,
		salary: data.salary || null,
		description: data.description,
		contactEmail: data.contactEmail,
		userId: session.user.id
	}).returning();
	return newJob;
});
var getUserJobs_createServerFn_handler = createServerRpc({
	id: "4847089f9496da6b62617f544cc0723584c252cb0bbd204dab73dfba5eabc3e8",
	name: "getUserJobs",
	filename: "src/server/jobs.ts"
}, (opts) => getUserJobs.__executeServer(opts));
var getUserJobs = createServerFn({ method: "GET" }).inputValidator(z.string()).handler(getUserJobs_createServerFn_handler, async ({ data: userId }) => {
	const session = await getCurrentSession();
	if (!session?.user?.id || session.user.id !== userId) throw new Error("Unauthorized");
	return db.select().from(jobs).where(eq(jobs.userId, userId)).orderBy(desc(jobs.createdAt));
});
var deleteJob_createServerFn_handler = createServerRpc({
	id: "bc95ff182e5eade0d2338330c19566a7af6007a131dc8b6227f3917ce6657e9b",
	name: "deleteJob",
	filename: "src/server/jobs.ts"
}, (opts) => deleteJob.__executeServer(opts));
var deleteJob = createServerFn({ method: "POST" }).inputValidator(z.string()).handler(deleteJob_createServerFn_handler, async ({ data: jobId }) => {
	const session = await getCurrentSession();
	if (!session?.user?.id) throw new Error("Unauthorized");
	const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
	if (!job) throw new Error("Job not found");
	if (job.userId !== session.user.id) throw new Error("Unauthorized: You do not own this job listing");
	await db.delete(jobs).where(eq(jobs.id, jobId));
	return { success: true };
});
//#endregion
export { createJob_createServerFn_handler, deleteJob_createServerFn_handler, getUserJobs_createServerFn_handler };
