import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const searchSchema = z.object({
    type: z.enum(["full-time", "part-time", "remote", "contract"]).optional(),
});

const getJobs = createServerFn({ method: "GET" })
    .inputValidator(searchSchema)
    .handler(async ({ data }) => {
        if (data.type) {
            return db
                .select()
                .from(jobs)
                .where(eq(jobs.type, data.type))
                .orderBy(desc(jobs.createdAt));
        }

        return db.select().from(jobs).orderBy(desc(jobs.createdAt));
    });

export const Route = createFileRoute("/jobs/")({
    validateSearch: searchSchema, // ?type=invalid
    loaderDeps: ({ search }) => ({ type: search.type }),
    loader: async ({ deps }) => ({
        jobs: await getJobs({ data: { type: deps.type } }),
    }),
    component: RouteComponent,
});

function RouteComponent() {
    const { jobs } = Route.useLoaderData();
    const search = Route.useSearch();
    const navigate = Route.useNavigate();

    const types = ["full-time", "part-time", "remote", "contract"] as const;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Browse Jobs</h1>
                <span className="text-gray-500 text-sm">{jobs.length} listings</span>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => navigate({ search: {} })}
                    className={`px-3 py-1.5 rounded-full text-sm border ${!search.type
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                >
                    All
                </button>

                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => navigate({ search: { type } })}
                        className={`px-3 py-1.5 rounded-full text-sm border capitalize ${search.type === type
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <Link
                        key={job.id}
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {job.title}
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    {job.company} · {job.location}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                                    {job.type}
                                </span>
                                {job.salary && (
                                    <span className="text-sm text-gray-400">{job.salary}</span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
                {jobs.length === 0 && (
                    <p className="text-center text-gray-400 py-12">
                        No jobs found for this filter.
                    </p>
                )}
            </div>
        </div>
    );
}