import { t as Route } from "./jobs-Cr7b3DOG.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/jobs/index.tsx?tsr-split=component
function RouteComponent() {
	const { jobs } = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto px-4 py-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-8",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold",
					children: "Browse Jobs"
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-gray-500 text-sm",
					children: [jobs.length, " listings"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2 mb-6 flex-wrap",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => navigate({ search: {} }),
					className: `px-3 py-1.5 rounded-full text-sm border ${!search.type ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:border-gray-400"}`,
					children: "All"
				}), [
					"full-time",
					"part-time",
					"remote",
					"contract"
				].map((type) => /* @__PURE__ */ jsx("button", {
					onClick: () => navigate({ search: { type } }),
					className: `px-3 py-1.5 rounded-full text-sm border capitalize ${search.type === type ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:border-gray-400"}`,
					children: type
				}, type))]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [jobs.map((job) => /* @__PURE__ */ jsx(Link, {
					to: "/jobs/$jobId",
					params: { jobId: job.id },
					className: "block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-gray-900",
							children: job.title
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-gray-500 mt-1",
							children: [
								job.company,
								" · ",
								job.location
							]
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-end gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm capitalize",
								children: job.type
							}), job.salary && /* @__PURE__ */ jsx("span", {
								className: "text-sm text-gray-400",
								children: job.salary
							})]
						})]
					})
				}, job.id)), jobs.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-center text-gray-400 py-12",
					children: "No jobs found for this filter."
				})]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
