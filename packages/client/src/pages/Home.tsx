import { useEffect, useState } from "react";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { getHotels } from "../services/hotels/get-hotels";
import { useDebounce } from "../hooks/useDebounce";
import { getCountries } from "../services/countries/get-countries";
import type { City, Country, Hotel } from "schemas";
import { getCities } from "../services/cities/get-cities";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [cities, setCities] = useState<City[] | []>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedValue) {
        const [hotels, countries, cities] = await Promise.all([
          getHotels(debouncedValue),
          getCountries(debouncedValue),
          getCities(debouncedValue),
        ]);

        setHotels(hotels ?? []);
        setCountries(countries ?? []);
        setCities(cities ?? []);

        setShowClearBtn(true);
        setDropdownVisible(true);
      } else {
        setHotels([]);
        setCountries([]);
        setCities([]);
        setShowClearBtn(false);
        setDropdownVisible(false);
      }
    };

    fetchResults();
  }, [debouncedValue]);

  const clearSearch = () => {
    setInputValue("");
    setHotels([]);
    setCountries([]);
    setCities([]);
    setShowClearBtn(false);
    setDropdownVisible(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <SearchBar
                value={inputValue}
                onSearch={setInputValue}
                showClearBtn={showClearBtn}
                onClear={clearSearch}
              />

              {dropdownVisible && (
                <SearchResults
                  hotels={hotels}
                  countries={countries}
                  cities={cities}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
