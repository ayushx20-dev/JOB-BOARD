import { t as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-DyBjcV9Q.js";
import { t as getCurrentSession } from "./get-session-BGEPhOSi.js";
//#region src/routes/jobs/new.tsx?tss-serverfn-split
var fetchSession_createServerFn_handler = createServerRpc({
	id: "260bd1b09819111173ce3bd631b7989afe91943ea2f7ebc6802470b0c275cf5b",
	name: "fetchSession",
	filename: "src/routes/jobs/new.tsx"
}, (opts) => fetchSession.__executeServer(opts));
var fetchSession = createServerFn({ method: "GET" }).handler(fetchSession_createServerFn_handler, async () => {
	return getCurrentSession();
});
//#endregion
export { fetchSession_createServerFn_handler };
