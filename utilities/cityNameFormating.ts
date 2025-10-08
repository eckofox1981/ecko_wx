import { City } from "@/models/city";

export function cityNameFormating(city: City) {
  if (city.state === undefined) {
    return city.name + ", " + city.country;
  }

  return city.name + ", " + city.state + ", " + city.country;
}
