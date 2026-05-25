import { i as getRequest } from "../server.js";
import { t as authConfig } from "./auth-B3DFAshx.js";
import { getSession } from "start-authjs";
//#region src/lib/get-session.ts
async function getCurrentSession() {
	return getSession(getRequest(), authConfig);
}
//#endregion
export { getCurrentSession as t };
