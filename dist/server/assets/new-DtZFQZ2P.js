import { t as createJob } from "./jobs-6kprN0v8.js";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/jobs/new.tsx?tsr-split=component
function RouteComponent() {
	const router = useRouter();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	async function handleSubmit(e) {
		e.preventDefault();
		setPending(true);
		setError("");
		const form = new FormData(e.currentTarget);
		try {
			await createJob({ data: {
				title: form.get("title"),
				company: form.get("company"),
				location: form.get("location"),
				type: form.get("type"),
				salary: form.get("salary"),
				description: form.get("description"),
				contactEmail: form.get("contactEmail")
			} });
			router.navigate({ to: "/jobs" });
		} catch (error) {
			setError(error.message || "Something went wrong. Please try again");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-2xl mx-auto px-4 py-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold mb-6",
				children: "Post a Job"
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6",
				children: error
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-5 bg-white rounded-xl border border-gray-200 p-6",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-medium mb-1",
						children: ["Job Title ", /* @__PURE__ */ jsx("span", {
							className: "text-red-500",
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("input", {
						name: "title",
						required: true,
						placeholder: "e.g. Senior Frontend Engineer",
						className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium mb-1",
							children: ["Company ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsx("input", {
							name: "company",
							required: true,
							className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium mb-1",
							children: ["Location ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsx("input", {
							name: "location",
							required: true,
							placeholder: "Remote, Lagos, London...",
							className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium mb-1",
							children: ["Job Type ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsxs("select", {
							name: "type",
							required: true,
							className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "full-time",
									children: "Full-time"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "part-time",
									children: "Part-time"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "remote",
									children: "Remote"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "contract",
									children: "Contract"
								})
							]
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium mb-1",
							children: "Salary Range"
						}), /* @__PURE__ */ jsx("input", {
							name: "salary",
							placeholder: "e.g. $80k – $120k",
							className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-medium mb-1",
						children: ["Contact Email ", /* @__PURE__ */ jsx("span", {
							className: "text-red-500",
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("input", {
						name: "contactEmail",
						type: "email",
						required: true,
						placeholder: "jobs@yourcompany.com",
						className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-medium mb-1",
						children: ["Job Description ", /* @__PURE__ */ jsx("span", {
							className: "text-red-500",
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("textarea", {
						name: "description",
						required: true,
						rows: 6,
						placeholder: "Describe the role, requirements, and what makes your company great...",
						className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
					})] }),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: pending,
						className: "w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors",
						children: pending ? "Posting..." : "Post Job"
					})
				]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
