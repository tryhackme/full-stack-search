import { useEffect, useState } from "react";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { getHotels } from "../services/hotels/get-hotels";
import { useDebounce } from "../hooks/useDebounce";
import { getCountries } from "../services/countries/get-countries";
import type { Country, Hotel } from "schemas";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchHotels = async () => {
      if (debouncedValue) {
        const filteredHotels = await getHotels(debouncedValue);
        const filteredCountries = await getCountries(debouncedValue);

        const [hotels, countries] = await Promise.all([
          filteredHotels,
          filteredCountries,
        ]);

        setHotels(hotels ?? []);
        setCountries(countries ?? []);

        setShowClearBtn(true);
        setDropdownVisible(true);
      } else {
        setHotels([]);
        setCountries([]);
        setShowClearBtn(false);
        setDropdownVisible(false);
      }
    };

    fetchHotels();
  }, [debouncedValue]);

  const clearSearch = () => {
    setInputValue("");
    setHotels([]);
    setCountries([]);
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
                <SearchResults countries={countries} hotels={hotels} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
