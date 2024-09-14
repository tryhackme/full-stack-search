// types.ts
export type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export type Country = {
  _id: string;
  country: string;
  countryisocode: string;
};

export type City = {
  _id: string;
  name: string;
};

export type SearchResults = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};

export interface SearchContextType {
  searchResults: SearchResults;
  setSearchResults: (results: SearchResults) => void;
}
