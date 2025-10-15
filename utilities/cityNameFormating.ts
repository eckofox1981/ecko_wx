import { City } from "@/models/city";

/**
 * formates city name depending on whether sate is included or not
 * @param city
 * @returns string
 */
export function cityNameFormating(city: City) {
  if (city.state === undefined) {
    return city.name + ", " + city.country;
  }

  return city.name + ", " + city.state + ", " + city.country;
}
