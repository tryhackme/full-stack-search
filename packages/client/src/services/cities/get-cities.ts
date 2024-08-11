import type { City } from "schemas";
import { API_URL } from "../const";

export async function getCities(query: string) {
  const citiesData = await fetch(
    `${API_URL}/cities?name=${encodeURIComponent(query)}`
  );
  const { cities } = (await citiesData.json()) as {
    cities: City[];
  };

  return cities;
}
