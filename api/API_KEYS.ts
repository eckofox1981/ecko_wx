import { City } from "@/models/city";

export const OPEN_WX_API_KEY: string =
  "&appid=e45166a29325d9baa29447f7e208929d"; //includes syntax for call, would typically be hidden in env  but visible for school project

export function CITY_GEOCODING_URL(name: string) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=20`;
}

export function REVERSE_GEODING_URL(lat: number, lon: number) {
  const latitude = Math.floor(lat * 1000) / 1000;
  const longitude = Math.floor(lon * 1000) / 1000;
  return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1`;
}

export function WEATHER_CURRENT_WEATHER_URL(city: City, lang: string) {
  const lat: number = Math.floor(city.lat * 100) / 100;
  const lon: number = Math.floor(city.lon * 100) / 100;
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
}

export function WEATHER_FORECAST_URL(city: City, lang: string) {
  const lat: number = Math.floor(city.lat * 100) / 100;
  const lon: number = Math.floor(city.lon * 100) / 100;
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`;
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
