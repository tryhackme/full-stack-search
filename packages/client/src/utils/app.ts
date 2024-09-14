import { getCodeSandboxHost } from "@codesandbox/utils";
import { ApiResponse } from "./types";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

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
