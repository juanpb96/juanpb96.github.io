import type { Config, Context } from "@netlify/edge-functions"

const WEATHER_APP_ORIGIN = "https://juanbonilla-fem-weather-app.netlify.app"

const ALLOWED_METHODS = ["GET", "HEAD"]

// Request headers passed on to the weather app; everything else is dropped.
// The rsc/next-* ones carry the Next.js App Router's client-side navigation
// and prefetch requests.
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-encoding",
  "accept-language",
  "cache-control",
  "if-modified-since",
  "if-none-match",
  "user-agent",
  "rsc",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-router-state-tree",
  "next-url",
]

const STRIPPED_RESPONSE_HEADERS = ["set-cookie", "x-powered-by"]

// netlify.toml's [[headers]] don't reach edge-function responses, so the
// security headers the rest of the site gets are set here. HSTS matches the
// apex's value.
const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
}

function withSecurityHeaders(headers: Headers): Headers {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value)
  }

  return headers
}

// The weather app renders server-side from the visitor's location, which its own
// geolocation edge function provides. That function doesn't receive the visitor's
// geo when the page is reached through a netlify.toml rewrite, so the page is
// proxied from here instead, passing the geo in the `x-geo-context` header the
// weather app reads first.
export default async function handler(request: Request, context: Context) {
  if (!ALLOWED_METHODS.includes(request.method)) {
    return new Response(null, {
      status: 405,
      headers: withSecurityHeaders(
        new Headers({ Allow: ALLOWED_METHODS.join(", ") }),
      ),
    })
  }

  const headers = new Headers()

  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name)

    if (value !== null) {
      headers.set(name, value)
    }
  }

  headers.set("x-geo-context", JSON.stringify(context.geo))

  const { pathname, search } = new URL(request.url)

  try {
    const upstream = await fetch(`${WEATHER_APP_ORIGIN}${pathname}${search}`, {
      method: request.method,
      headers,
      redirect: "manual",
    })

    const responseHeaders = new Headers(upstream.headers)

    for (const name of STRIPPED_RESPONSE_HEADERS) {
      responseHeaders.delete(name)
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: withSecurityHeaders(responseHeaders),
    })
  } catch {
    console.error("weather-app: upstream request failed")

    return new Response("Bad Gateway", {
      status: 502,
      headers: withSecurityHeaders(
        new Headers({ "Content-Type": "text/plain; charset=utf-8" }),
      ),
    })
  }
}

export const config: Config = {
  path: ["/FEM_weather-app", "/FEM_weather-app/*"],
}
