import type { City, Country, Hotel } from "schemas";
import { ItemResult } from "./ItemResult";

export interface SearchResult {
  hotels: Hotel[] | [];
  countries: Country[] | [];
  cities: City[] | [];
}

export function SearchResults({ hotels, countries, cities }: SearchResult) {
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

      <h2>Cities</h2>
      {!cities.length ? (
        <p>No cities matched</p>
      ) : (
        cities.map((city, index) => (
          <ItemResult
            key={index}
            label={city.name}
            link={`/cities/${city._id}`}
          />
        ))
      )}
    </div>
  );
}
