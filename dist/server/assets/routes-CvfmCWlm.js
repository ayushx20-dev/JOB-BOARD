import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=component
function RouteComponent() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-bold text-gray-900 mb-4",
				children: "Find Your Next Role"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-gray-500 text-lg mb-8",
				children: "Browse hundreds of jobs from top companies."
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/jobs",
				className: "bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold",
				children: "Browse Jobs →"
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
