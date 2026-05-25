import { authConfig } from "@/auth";
import { getRequest } from "@tanstack/react-start/server";
import { getSession } from "start-authjs";

export async function getCurrentSession() {
  const request = getRequest();

  return getSession(request, authConfig);
}
