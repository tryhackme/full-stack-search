import { useState, type ChangeEvent } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import type { Hotel } from "schemas";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

const fetchAndFilterHotels = async (value: string) => {
  const hotelsData = await fetch(`${API_URL}/hotels`);
  const hotels = (await hotelsData.json()) as Hotel[];
  return hotels.filter(
    ({ chainName, hotelName, city, country }) =>
      chainName.toLowerCase().includes(value.toLowerCase()) ||
      hotelName.toLowerCase().includes(value.toLowerCase()) ||
      city.toLowerCase().includes(value.toLowerCase()) ||
      country.toLowerCase().includes(value.toLowerCase())
  );
};

function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setHotels([]);
      setShowClearBtn(false);
      setDropdownVisible(false);
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(event.target.value);
    setShowClearBtn(true);
    setHotels(filteredHotels);
    setDropdownVisible(true);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <SearchBar
                onSearch={fetchData}
                showClearBtn={showClearBtn}
                onClear={() => {
                  setHotels([]);
                  setShowClearBtn(false);
                }}
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
