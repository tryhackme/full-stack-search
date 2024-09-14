import { useState, type ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";
import { City, Country, Hotel } from "../utils/types";
import { fetchAndFilterData } from "../utils/app";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";


const SearchPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const debouncedFetchData = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setHotels([]);
        setCountries([]);
        setCities([]);
        setShowClearBtn(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { filteredHotels, filteredCountries, filteredCities } =
          await fetchAndFilterData(query);
        setHotels(filteredHotels);
        setCountries(filteredCountries);
        setCities(filteredCities);
        setShowClearBtn(true);
      } catch (err) {
        console.log({ err });
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const fetchData = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchValue(query);
    debouncedFetchData(query);
  };

  const clearSearch = () => {
    setHotels([]);
    setCountries([]);
    setCities([]);
    setSearchValue("");
    setShowClearBtn(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <SearchForm
                searchValue={searchValue}
                onChange={fetchData}
                onClear={clearSearch}
                showClearBtn={showClearBtn}
                loading={loading}
                error={error}
              />
              <SearchResults
                hotels={hotels}
                countries={countries}
                cities={cities}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
