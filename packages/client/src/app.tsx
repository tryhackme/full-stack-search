import { useState, type ChangeEvent, useCallback } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import debounce from "lodash/debounce";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

type ApiResponse = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};
type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

type Country = {
  _id: string;
  country: string;
  countryisocode: string;
};

type City = {
  _id: string;
  name: string;
};

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

const fetchAndFilterData = async (value: string) => {
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

// Detail Page Component for Hotel, Country, or City
const DetailPage = ({ title }: { title: string }) => (
  <div>
    <h1>{title}</h1>
    <p>More details about {title} will go here.</p>
  </div>
);

function SearchPage() {
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
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={fetchData}
                  value={searchValue}
                />
                {showClearBtn && (
                  <span
                    className="left-pan"
                    onClick={clearSearch}
                    role="button"
                  >
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>

              {loading && <div className="loading-spinner">Loading...</div>}
              {error && <p className="error">{error}</p>}

              {!!hotels.length && !loading && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? (
                    hotels.map((hotel) => (
                      <li key={hotel._id}>
                        <Link
                          to={`/hotels/${hotel._id}`}
                          className="custom-link"
                        >
                          <i className="fa fa-building mr-2"></i>
                          {hotel.hotel_name}
                        </Link>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No hotels matched</p>
                  )}

                  <h2>Countries</h2>
                  {countries.length ? (
                    countries.map((country) => (
                      <li key={country._id}>
                        <Link
                          to={`/countries/${country._id}`}
                          className="custom-link"
                        >
                          <i className="fa fa-map-marker mr-2"></i>
                          {country.country}
                        </Link>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No countries matched</p>
                  )}

                  <h2>Cities</h2>
                  {cities.length ? (
                    cities.map((city) => (
                      <li key={city._id}>
                        <Link
                          to={`/cities/${city._id}`}
                          className="custom-link"
                        >
                          <i className="fa fa-city mr-2"></i>
                          {city.name}
                        </Link>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No cities matched</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Search Page */}
        <Route path="/" element={<SearchPage />} />

        {/* Dynamic Detail Pages for Hotel, Country, and City */}
        <Route
          path="/hotels/:id"
          element={<DetailPage title="Hotel Details" />}
        />
        <Route
          path="/countries/:id"
          element={<DetailPage title="Country Details" />}
        />
        <Route
          path="/cities/:id"
          element={<DetailPage title="City Details" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
