import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/jobs/$jobId.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", {
	className: "text-center py-24 text-gray-400",
	children: [/* @__PURE__ */ jsx("p", {
		className: "text-lg mb-4",
		children: "This job listing doesn't exist."
	}), /* @__PURE__ */ jsx(Link, {
		to: "/jobs",
		className: "text-blue-600 hover:underline",
		children: "Back to all jobs"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
