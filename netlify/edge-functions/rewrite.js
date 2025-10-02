const WEATHER_APP_URL =
  "https://juanbonilla-fem-weather-app.netlify.app/FEM_weather-app";

export default async (_, context) => {
  try {
    const response = await fetch(WEATHER_APP_URL);

    return new Response(response.body, { status: response.status, headers });
  } catch (error) {
    context.log("Error fetching external resource:", error);
    return new Response("Error fetching external content", { status: 500 });
  }
};
