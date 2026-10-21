import { afterEach, describe, expect, it, vi } from "vitest"

import handler, { config } from "./edge-functions/weather-app"

const GEO = {
  city: "Bogotá",
  country: { code: "CO", name: "Colombia" },
  latitude: 4.6913,
  longitude: -74.032,
}

const context = { geo: GEO }

function mockUpstream(response = new Response("ok")) {
  const fetchMock = vi.fn().mockResolvedValue(response)

  vi.stubGlobal("fetch", fetchMock)

  return fetchMock
}

function upstreamRequest(fetchMock: ReturnType<typeof vi.fn>) {
  const [url, init] = fetchMock.mock.calls[0]

  return { url, init, headers: new Headers(init.headers) }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("weather app edge function", () => {
  it("serves the app's root and every path under it", () => {
    expect(config.path).toEqual(["/FEM_weather-app", "/FEM_weather-app/*"])
  })

  it("proxies GET to the same path and query on the weather app", async () => {
    const fetchMock = mockUpstream()

    const response = await handler(
      new Request("https://juanbonilla.me/FEM_weather-app/_next/a.js?v=1"),
      context,
    )

    const { url, init } = upstreamRequest(fetchMock)

    expect(response.status).toBe(200)
    expect(await response.text()).toBe("ok")
    expect(url).toBe(
      "https://juanbonilla-fem-weather-app.netlify.app/FEM_weather-app/_next/a.js?v=1",
    )
    expect(init.method).toBe("GET")
    expect(init.redirect).toBe("manual")
  })

  it("proxies HEAD", async () => {
    const fetchMock = mockUpstream(new Response(null))

    const response = await handler(
      new Request("https://juanbonilla.me/FEM_weather-app", { method: "HEAD" }),
      context,
    )

    expect(response.status).toBe(200)
    expect(upstreamRequest(fetchMock).init.method).toBe("HEAD")
  })

  it.each(["POST", "PUT", "PATCH", "DELETE", "OPTIONS"])(
    "rejects %s with 405 without calling the weather app",
    async (method) => {
      const fetchMock = mockUpstream()

      const response = await handler(
        new Request("https://juanbonilla.me/FEM_weather-app", { method }),
        context,
      )

      expect(response.status).toBe(405)
      expect(response.headers.get("allow")).toBe("GET, HEAD")
      expect(response.headers.get("x-content-type-options")).toBe("nosniff")
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it("passes the visitor's location in x-geo-context", async () => {
    const fetchMock = mockUpstream()

    await handler(
      new Request("https://juanbonilla.me/FEM_weather-app", {
        headers: { "x-geo-context": '{"city":"Elsewhere"}' },
      }),
      context,
    )

    const { headers } = upstreamRequest(fetchMock)

    expect(JSON.parse(headers.get("x-geo-context") ?? "")).toEqual(GEO)
  })

  it("forwards only the allow-listed request headers", async () => {
    const fetchMock = mockUpstream()

    await handler(
      new Request("https://juanbonilla.me/FEM_weather-app", {
        headers: {
          accept: "text/html",
          "accept-language": "es-CO",
          "user-agent": "test",
          rsc: "1",
          "next-router-state-tree": "%5B%5D",
          "next-url": "/FEM_weather-app",
          cookie: "a=b",
          authorization: "Bearer x",
          "geo-city": "Elsewhere",
          "x-forwarded-host": "example.com",
        },
      }),
      context,
    )

    const { headers } = upstreamRequest(fetchMock)

    expect(headers.get("accept")).toBe("text/html")
    expect(headers.get("accept-language")).toBe("es-CO")
    expect(headers.get("user-agent")).toBe("test")
    expect(headers.get("rsc")).toBe("1")
    expect(headers.get("next-router-state-tree")).toBe("%5B%5D")
    expect(headers.get("next-url")).toBe("/FEM_weather-app")
    expect(headers.get("cookie")).toBeNull()
    expect(headers.get("authorization")).toBeNull()
    expect(headers.get("geo-city")).toBeNull()
    expect(headers.get("x-forwarded-host")).toBeNull()
  })

  it("keeps the upstream status and body and sets the security headers", async () => {
    mockUpstream(
      new Response("<html></html>", {
        status: 404,
        headers: {
          "content-type": "text/html",
          "set-cookie": "session=1",
          "x-powered-by": "Next.js",
          "x-frame-options": "SAMEORIGIN",
        },
      }),
    )

    const response = await handler(
      new Request("https://juanbonilla.me/FEM_weather-app/missing"),
      context,
    )

    expect(response.status).toBe(404)
    expect(await response.text()).toBe("<html></html>")
    expect(response.headers.get("content-type")).toBe("text/html")
    expect(response.headers.get("set-cookie")).toBeNull()
    expect(response.headers.get("x-powered-by")).toBeNull()
    expect(response.headers.get("strict-transport-security")).toBe(
      "max-age=31536000",
    )
    expect(response.headers.get("x-content-type-options")).toBe("nosniff")
    expect(response.headers.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin",
    )
    expect(response.headers.get("x-frame-options")).toBe("DENY")
  })

  it("passes upstream redirects through", async () => {
    mockUpstream(
      new Response(null, {
        status: 308,
        headers: { location: "/FEM_weather-app" },
      }),
    )

    const response = await handler(
      new Request("https://juanbonilla.me/FEM_weather-app/"),
      context,
    )

    expect(response.status).toBe(308)
    expect(response.headers.get("location")).toBe("/FEM_weather-app")
  })

  it("returns 502 with a generic log line when the weather app is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("connect failed: secret detail")),
    )
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    const response = await handler(
      new Request("https://juanbonilla.me/FEM_weather-app?q=private"),
      context,
    )

    expect(response.status).toBe(502)
    expect(response.headers.get("x-content-type-options")).toBe("nosniff")
    expect(consoleError).toHaveBeenCalledWith(
      "weather-app: upstream request failed",
    )
  })
})
