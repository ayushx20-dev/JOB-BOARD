import { authConfig } from "@/auth";
import { createFileRoute } from "@tanstack/react-router";
import { StartAuthJS } from "start-authjs"

const auth = StartAuthJS(authConfig)

export const Route = createFileRoute("/api/auth/$")({
    server: {
        handlers: {
            GET: ({ request }) => auth.GET({ request }),
            POST: ({ request }) => auth.POST({ request })
        }
    }
})