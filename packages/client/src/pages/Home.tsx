import { useEffect, useState } from "react";
import type { Hotel } from "schemas";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { getHotels } from "../services/hotels/get-hotels";
import { useDebounce } from "../hooks/useDebounce";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchHotels = async () => {
      if (debouncedValue) {
        const filteredHotels = await getHotels(debouncedValue);
        setHotels(filteredHotels);
        setShowClearBtn(true);
        setDropdownVisible(true);
      } else {
        setHotels([]);
        setShowClearBtn(false);
        setDropdownVisible(false);
      }
    };

    fetchHotels();
  }, [debouncedValue]);

  const clearSearch = () => {
    setInputValue("");
    setHotels([]);
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

              {dropdownVisible && <SearchResults hotels={hotels} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
