import { createServerFn } from "@tanstack/react-start";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { getCurrentSession } from "@/src/lib/get-session";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["full-time", "part-time", "remote", "contract"]),
  salary: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  contactEmail: z.string().email("Invalid email address"),
});

export const createJob = createServerFn({ method: "POST" })
  .inputValidator(jobSchema)
  .handler(async ({ data }) => {
    const session = await getCurrentSession();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const [newJob] = await db
      .insert(jobs)
      .values({
        title: data.title,
        company: data.company,
        location: data.location,
        type: data.type,
        salary: data.salary || null,
        description: data.description,
        contactEmail: data.contactEmail,
        userId: session.user.id,
      })
      .returning();

    return newJob;
  });

export const getUserJobs = createServerFn({ method: "GET" })
  .inputValidator(z.string())
  .handler(async ({ data: userId }) => {
    const session = await getCurrentSession();
    if (!session?.user?.id || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    return db
      .select()
      .from(jobs)
      .where(eq(jobs.userId, userId))
      .orderBy(desc(jobs.createdAt));
  });

export const deleteJob = createServerFn({ method: "POST" })
  .inputValidator(z.string())
  .handler(async ({ data: jobId }) => {
    const session = await getCurrentSession();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Retrieve the job to verify ownership
    const [job] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (!job) {
      throw new Error("Job not found");
    }

    if (job.userId !== session.user.id) {
      throw new Error("Unauthorized: You do not own this job listing");
    }

    await db.delete(jobs).where(eq(jobs.id, jobId));
    return { success: true };
  });