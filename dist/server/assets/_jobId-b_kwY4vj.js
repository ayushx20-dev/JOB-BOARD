import { t as Route } from "./_jobId-ZRCMV_RK.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/jobs/$jobId.tsx?tsr-split=component
function RouteComponent() {
	const { job } = Route.useLoaderData();
	const mailtoLink = `mailto:${job.contactEmail}?subject=${encodeURIComponent(`Applying for ${job.title} at ${job.company}`)}`;
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-3xl mx-auto px-4 py-8",
		children: [/* @__PURE__ */ jsx(Link, {
			to: "/jobs",
			className: "text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block",
			children: "← Back to all jobs"
		}), /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-xl border border-gray-200 p-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between mb-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold text-gray-900",
						children: job.title
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 mt-1 text-lg",
						children: job.company
					})] }), /* @__PURE__ */ jsx("span", {
						className: "bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm capitalize",
						children: job.type
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-6 text-sm text-gray-500 mb-8 flex-wrap",
					children: [
						/* @__PURE__ */ jsxs("span", { children: ["📍 ", job.location] }),
						job.salary && /* @__PURE__ */ jsxs("span", { children: ["💰 ", job.salary] }),
						/* @__PURE__ */ jsxs("span", { children: ["🗓 Posted ", new Date(job.createdAt).toLocaleDateString()] })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-gray-900 mb-3",
						children: "About the role"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-700 leading-relaxed whitespace-pre-wrap",
						children: job.description
					})]
				}),
				/* @__PURE__ */ jsx("a", {
					href: mailtoLink,
					className: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors",
					children: "Apply for this role →"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-gray-400 mt-3",
					children: "Opens your email client with the subject pre-filled."
				})
			]
		})]
	});
}
//#endregion
export { RouteComponent as component };
