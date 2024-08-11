import type { City } from "schemas";
import { API_URL } from "../const";

export async function getCityById(cityId: string) {
  const cityData = await fetch(`${API_URL}/cities/${cityId}`);
  const { city } = (await cityData.json()) as { city: City };

  return city;
}
