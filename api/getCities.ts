import { City } from "@/models/city";
import {
  CITY_GEOCODING_URL,
  OPEN_WX_API_KEY,
  REVERSE_GEODING_URL,
} from "./API_KEYS";

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
    throw new Error(error.message);
  }
}

export async function getCityByCoordinates(lat: number, lon: number) {
  const callUrl = REVERSE_GEODING_URL(lat, lon) + OPEN_WX_API_KEY;

  try {
    const response = await fetch(callUrl, {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();

    return new City(
      json[0].name,
      json[0].lat,
      json[0].lon,
      json[0].country,
      json[0]?.state
    );
  } catch (error: any) {
    console.log("Reverse geocoding error: " + error.message);
    throw new Error(error.message);
  }
}
