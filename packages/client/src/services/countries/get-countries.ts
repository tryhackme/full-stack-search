import type { Country } from "schemas";
import { API_URL } from "../const";

export async function getCountries(query: string) {
  const countriesData = await fetch(
    `${API_URL}/countries?country=${encodeURIComponent(query)}`
  );
  const { countries } = (await countriesData.json()) as {
    countries: Country[];
  };

  return countries;
}
