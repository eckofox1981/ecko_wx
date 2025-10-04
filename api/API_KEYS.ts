import { City } from "@/models/city";

export const OPEN_WX_API_KEY: string =
  "&appid=e45166a29325d9baa29447f7e208929d"; //includes syntax for call
export const CITY_GEOCODING_URL: string =
  "http://api.openweathermap.org/geo/1.0/direct?q=";

export function CURRENT_FORECAST_URL(city: City, lang: string) {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&lang=${lang}`;
}
/*
lang:
en : english,
fr: french,
sv, se: swedish
*/

export function GET_WEATHER_ICON_URL(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}.png`;
}
