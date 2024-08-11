import type { Country, Hotel } from "schemas";
import { ItemResult } from "./ItemResult";

export interface SearchResult {
  hotels: Hotel[] | [];
  countries: Country[] | [];
}

export function SearchResults({ hotels, countries }: SearchResult) {
  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <h2>Hotels</h2>
      {!hotels.length ? (
        <p>No hotels matched</p>
      ) : (
        hotels.map((hotel, index) => (
          <ItemResult
            key={index}
            label={hotel.hotelName}
            link={`/hotels/${hotel._id}`}
          />
        ))
      )}

      <h2>Countries</h2>
      {!countries.length ? (
        <p>No countries matched</p>
      ) : (
        countries.map((country, index) => (
          <ItemResult
            key={index}
            label={`${country.country} (${country.countryIsoCode})`}
            link={`/countries/${country._id}`}
          />
        ))
      )}
    </div>
  );
}
