import type { Config, Context } from '@netlify/edge-functions'

const WEATHER_APP_URL = 'https://juanbonilla-fem-weather-app.netlify.app/FEM_weather-app'

// The weather app renders server-side from the visitor's location, which its own
// geolocation edge function provides. That function doesn't receive the visitor's
// geo when the page is reached through a netlify.toml rewrite, so the page is
// proxied from here instead, passing the geo in the `x-geo-context` header the
// weather app reads first.
export default async function handler(request: Request, context: Context) {
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.set('x-geo-context', JSON.stringify(context.geo))

  const { search } = new URL(request.url)

  return fetch(`${WEATHER_APP_URL}${search}`, {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'manual',
  })
}

export const config: Config = {
  path: '/FEM_weather-app',
}
