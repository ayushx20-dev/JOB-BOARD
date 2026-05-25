import { t as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { t as getCurrentSession } from "./get-session-BGEPhOSi.js";
//#region src/routes/dashboard.tsx?tss-serverfn-split
var fetchSession_createServerFn_handler = createServerRpc({
	id: "f80512be64264cf2bc0cc25dbd665361ed6ca9b1261a67ec1f6e926f47c65831",
	name: "fetchSession",
	filename: "src/routes/dashboard.tsx"
}, (opts) => fetchSession.__executeServer(opts));
var fetchSession = createServerFn({ method: "GET" }).handler(fetchSession_createServerFn_handler, async () => {
	return getCurrentSession();
});
//#endregion
export { fetchSession_createServerFn_handler };
