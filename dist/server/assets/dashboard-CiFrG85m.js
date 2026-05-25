import { n as deleteJob } from "./jobs-6kprN0v8.js";
import { t as Route } from "./dashboard-CkmfWyAn.js";
import { Link, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/dashboard.tsx?tsr-split=component
function RouteComponent() {
	const { jobs } = Route.useLoaderData();
	const router = useRouter();
	async function handleDelete(jobId) {
		if (!confirm("Delete this listing")) return;
		await deleteJob({ data: jobId });
		router.invalidate();
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto px-4 py-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between mb-8",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold",
				children: "My Listings"
			}), /* @__PURE__ */ jsx(Link, {
				to: "/jobs/new",
				className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium",
				children: "+ Post a Job"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [jobs.map((job) => /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-gray-900",
						children: job.title
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-gray-500 text-sm",
						children: [
							job.company,
							" · ",
							job.type,
							" · ",
							job.location
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-gray-400 text-xs mt-1",
						children: ["Posted ", new Date(job.createdAt).toLocaleDateString()]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-4 items-center",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/jobs/$jobId",
						params: { jobId: job.id },
						className: "text-sm text-blue-600 hover:underline",
						children: "View"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => handleDelete(job.id),
						className: "text-sm text-red-500 hover:underline",
						children: "Delete"
					})]
				})]
			}, job.id)), jobs.length === 0 && /* @__PURE__ */ jsxs("div", {
				className: "text-center py-16 text-gray-400",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-lg",
					children: "You haven't posted any jobs yet."
				}), /* @__PURE__ */ jsx(Link, {
					to: "/jobs/new",
					className: "mt-4 inline-block text-blue-600 hover:underline text-sm",
					children: "Post your first job →"
				})]
			})]
		})]
	});
}
//#endregion
export { RouteComponent as component };
