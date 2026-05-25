import { t as createServerFn } from "../server.js";
/* empty css             */
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { t as getCurrentSession } from "./get-session-BGEPhOSi.js";
//#region src/routes/__root.tsx?tss-serverfn-split
var fetchSession_createServerFn_handler = createServerRpc({
	id: "8ca68a78cb68399107cccece277a4ee8fb04a249ee2a1193bf3ec65b0df7039d",
	name: "fetchSession",
	filename: "src/routes/__root.tsx"
}, (opts) => fetchSession.__executeServer(opts));
var fetchSession = createServerFn({ method: "GET" }).handler(fetchSession_createServerFn_handler, async () => {
	return getCurrentSession();
});
//#endregion
export { fetchSession_createServerFn_handler };
