import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

const getJob = createServerFn({ method: "GET" })
    .inputValidator((id: string) => id)
    .handler(async ({ data: id }) => {
        const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

        if (!result[0]) throw notFound();

        return result[0];
    });

export const Route = createFileRoute("/jobs/$jobId")({
    component: RouteComponent,
    loader: async ({ params: { jobId } }) => {
        return {
            job: await getJob({ data: jobId }),
        };
    },
    validateSearch: (search) => ({
        // ?page=1&filter=open
        // page: Number(search.page ?? 1),
    }),
    notFoundComponent: () => (
        <div className="text-center py-24 text-gray-400">
            <p className="text-lg mb-4">This job listing doesn't exist.</p>
            <Link to="/jobs" className="text-blue-600 hover:underline">
                Back to all jobs
            </Link>
        </div>
    ),
});

function RouteComponent() {
    const { job } = Route.useLoaderData();

    const mailtoLink = `mailto:${job.contactEmail}?subject=${encodeURIComponent(
        `Applying for ${job.title} at ${job.company}`,
    )}`;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Link
                to="/jobs"
                className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
            >
                ← Back to all jobs
            </Link>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-gray-600 mt-1 text-lg">{job.company}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                        {job.type}
                    </span>
                </div>

                <div className="flex gap-6 text-sm text-gray-500 mb-8 flex-wrap">
                    <span>📍 {job.location}</span>
                    {job.salary && <span>💰 {job.salary}</span>}
                    <span>🗓 Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="mb-8">
                    <h2 className="font-semibold text-gray-900 mb-3">About the role</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </p>
                </div>

                <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                    Apply for this role →
                </a>
                <p className="text-xs text-gray-400 mt-3">
                    Opens your email client with the subject pre-filled.
                </p>
            </div>
        </div>
    );
}