import { City } from "@/models/city";
import { CITY_GEOCODING_URL, OPEN_WX_API_KEY } from "./API_KEYS";

export async function getCityList(name: string) {
  const callUrl: string = CITY_GEOCODING_URL(name) + OPEN_WX_API_KEY;
  try {
    const response = await fetch(callUrl, {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const jsonList = await response.json();
    const cityList = jsonList.map(
      (city: any) =>
        new City(city.name, city.lat, city.lon, city.country, city.state)
    );

    //Filters duplicate cities since API can return many cities
    // with same state (varying lon/lat but still same city)
    const uniqueCities = cityList.filter(
      (city: City, index: number, self: City[]) =>
        index === self.findIndex((c) => c.state === city.state)
    );

    return uniqueCities;
  } catch (error: any) {
    console.error("Error fetching city: " + error.message);
    return [];
  }
}
