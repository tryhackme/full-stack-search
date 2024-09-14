import { ApiResponse } from "./types";
import { API_URL } from "./constants";

export const fetchAndFilterData = async (value: string) => {
  const response = await fetch(
    `${API_URL}/hotels/search?q=${encodeURIComponent(value)}`
  );

  const data = (await response.json()) as ApiResponse;

  return {
    filteredHotels: data.hotels,
    filteredCountries: data.countries,
    filteredCities: data.cities,
  };
};
