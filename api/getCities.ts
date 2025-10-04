import { City } from "@/models/city";
import { CITY_GEOCODING_URL, OPEN_WX_API_KEY } from "./API_KEYS";

export async function getCityList(name: string) {
  try {
    const response = await fetch(
      `${CITY_GEOCODING_URL}${name}${OPEN_WX_API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const jsonList = await response.json();
    const cityList = jsonList.map(
      (city: any) =>
        new City(city.name, city.lat, city.lon, city.country, city.state)
    );

    return cityList;
  } catch (error: any) {
    console.error("Error fetching city: " + error.message);
    return [];
  }
}
