import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-D4hjqEwP.js";
import { z } from "zod";
//#region src/server/jobs.ts
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
var createJob = createServerFn({ method: "POST" }).inputValidator(jobSchema).handler(createSsrRpc("1a22b5891cbc77fe84018554231c045f4cc1c2e3c7fc2cc0dc10bd336a42e6b6"));
var getUserJobs = createServerFn({ method: "GET" }).inputValidator(z.string()).handler(createSsrRpc("4847089f9496da6b62617f544cc0723584c252cb0bbd204dab73dfba5eabc3e8"));
var deleteJob = createServerFn({ method: "POST" }).inputValidator(z.string()).handler(createSsrRpc("bc95ff182e5eade0d2338330c19566a7af6007a131dc8b6227f3917ce6657e9b"));
//#endregion
export { deleteJob as n, getUserJobs as r, createJob as t };
