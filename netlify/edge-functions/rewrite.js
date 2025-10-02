const WEATHER_APP_URL =
  "https://juanbonilla-fem-weather-app.netlify.app/FEM_weather-app";

export default async (request, context) => {
  try {
    const headers = new Headers(request.headers);
    headers.set("x-geo-context", context.geo);

    const proxyRequest = new Request(WEATHER_APP_URL, {
      ...request,
      headers,
    });

    return await fetch(proxyRequest);
  } catch (error) {
    context.log("Error fetching external resource:", error);
    return new Response("Error fetching external content", { status: 500 });
  }
};
