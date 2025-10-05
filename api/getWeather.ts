import { City } from "@/models/city";
import { CurrentWeather, ThreeHoursForeCast } from "@/models/weather";
import {
  OPEN_WX_API_KEY,
  WEATHER_CURRENT_WEATHER_URL,
  WEATHER_FORECAST_URL,
} from "./API_KEYS";

export async function getWeather(city: City, lang: string) {
  const callURL: string = WEATHER_CURRENT_WEATHER_URL(city, lang);

  try {
    const response = await fetch(`${callURL}${OPEN_WX_API_KEY}`, {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();

    const currentWx: CurrentWeather = new CurrentWeather(
      json.weather[0].main,
      json.weather[0].description,
      json.weather[0].icon,
      json.main.temp,
      json.main.feels_like,
      json.main.temp_min,
      json.main.temp_max,
      json.main.pressure,
      json.main.humidity,
      json.main.sea_level,
      json.visibility,
      json.wind.speed,
      json.wind.deg,
      json.wind?.gust ? json.wind.gust : 0,
      json.rain?.["1h"],
      json.clouds.all,
      new Date(json.dt * 1000),
      new Date(json.sys.sunrise * 1000),
      new Date(json.sys.sunset * 1000)
    );

    return currentWx;
  } catch (error) {
    console.error("Unable to fetch weather: " + error.message);
    return "Error";
  }
}

export async function getForecast(city: City, lang: string) {
  const callURl: string = WEATHER_FORECAST_URL(city, lang);

  try {
    const response = await fetch(callURl, {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();
    const forecast = json.list.map(
      (w: any) =>
        new ThreeHoursForeCast(
          w.dt,
          w.main.temp,
          w.main.feels_like,
          w.main.temp_min,
          w.main.temp_max,
          w.main.pressure,
          w.main.humidity,
          w.main.sea_level,
          w.weather.main,
          w.weather.description,
          w.weather.icon,
          w.clouds.all,
          w.wind.speed,
          w.wind.deg,
          w.wind.gust,
          w.visibility,
          w.pop,
          w.rain?.["3h"],
          w.snow?.["3h"]
        )
    );

    return forecast;
  } catch (error) {
    console.error("Unable to fetch forecast: " + error.message);
    return [];
  }
}
