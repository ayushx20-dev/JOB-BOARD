import {
    createFileRoute,
    Link,
    redirect,
    useRouter,
} from "@tanstack/react-router";
import { getCurrentSession } from "../lib/get-session";
import { createServerFn } from "@tanstack/react-start";
import { deleteJob, getUserJobs } from "../server/jobs";

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
    return getCurrentSession();
});

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async () => {
        const session = await fetchSession();

        if (!session?.user) {
            throw redirect({ to: "/" });
        }
        return { session };
    },
    loader: async ({ context }) => {
        const userJobs = await getUserJobs({ data: context.session.user?.id! });
        return { jobs: userJobs };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { jobs } = Route.useLoaderData();
    const router = useRouter();

    async function handleDelete(jobId: string) {
        if (!confirm("Delete this listing")) return;

        await deleteJob({ data: jobId });

        router.invalidate();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">My Listings</h1>
                <Link
                    to="/jobs/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Post a Job
                </Link>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between"
                    >
                        <div>
                            <h2 className="font-semibold text-gray-900">{job.title}</h2>
                            <p className="text-gray-500 text-sm">
                                {job.company} · {job.type} · {job.location}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Posted {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link
                                to="/jobs/$jobId"
                                params={{ jobId: job.id }}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                            <button
                                onClick={() => handleDelete(job.id)}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">You haven't posted any jobs yet.</p>
                        <Link
                            to="/jobs/new"
                            className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                        >
                            Post your first job →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}