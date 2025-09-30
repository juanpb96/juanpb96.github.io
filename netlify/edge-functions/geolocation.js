import { GEO_HEADERS } from "./utils/constants.js";

const externalUrl = "https://juanbonilla-fem-weather-app.netlify.app";

export default async (_, context) => {
  const { country, city, latitude, longitude } = context.geo;

  try {
    const response = await fetch(externalUrl);

    const headers = new Headers(response.headers);
    headers.set(GEO_HEADERS.country, country?.name ?? "");
    headers.set(GEO_HEADERS.city, city ?? "");
    headers.set(GEO_HEADERS.latitude, String(latitude ?? 0));
    headers.set(GEO_HEADERS.longitude, String(longitude ?? 0));

    return new Response(response.body, { status: response.status, headers });
  } catch (error) {
    context.log("Error fetching external resource:", error);
    return new Response("Error fetching external content", { status: 500 });
  }
};
