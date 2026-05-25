import { getCurrentSession } from "@/src/lib/get-session";
import { createJob } from "@/src/server/jobs";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
    return getCurrentSession();
});

export const Route = createFileRoute("/jobs/new")({
    beforeLoad: async () => {
        const session = await fetchSession();

        if (!session?.user) {
            throw redirect({ to: "/" });
        }
        return { session };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);
        setError("");

        const form = new FormData(e.currentTarget);

        try {
            await createJob({
                data: {
                    title: form.get("title") as string,
                    company: form.get("company") as string,
                    location: form.get("location") as string,
                    type: form.get("type") as any,
                    salary: form.get("salary") as string,
                    description: form.get("description") as string,
                    contactEmail: form.get("contactEmail") as string,
                },
            });

            router.navigate({ to: "/jobs" });
        } catch (error: any) {
            setError(error.message || "Something went wrong. Please try again");
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white rounded-xl border border-gray-200 p-6"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="title"
                        required
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Company <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="company"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="location"
                            required
                            placeholder="Remote, Lagos, London..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Job Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="type"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="remote">Remote</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Salary Range
                        </label>
                        <input
                            name="salary"
                            placeholder="e.g. $80k – $120k"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="contactEmail"
                        type="email"
                        required
                        placeholder="jobs@yourcompany.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        placeholder="Describe the role, requirements, and what makes your company great..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                    {pending ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
    );
}