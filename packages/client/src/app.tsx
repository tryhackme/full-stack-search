import { useState, type ChangeEvent } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";

type Hotel = { _id: string, chain_name: string; hotel_name: string; city: string, country: string };

type Country = { _id: string; country: string; countryisocode: string };

type City = { _id: string; name: string };

type ApiResponse = { hotels: Hotel[]; countries: Country[]; cities: City[] };

const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

const fetchAndFilterData = async (value: string) => {
  const response = await fetch(`${API_URL}/search`);
  const data = (await response.json()) as ApiResponse;
  const filteredHotels = data.hotels.filter(
    ({ chain_name, hotel_name, city, country }) =>
      chain_name?.toLowerCase().includes(value.toLowerCase()) ||
      hotel_name?.toLowerCase().includes(value.toLowerCase()) ||
      city?.toLowerCase().includes(value.toLowerCase()) ||
      country?.toLowerCase().includes(value.toLowerCase())
  );

  const filteredCountries = data.countries.filter(
    ({ country, countryisocode }) =>
      country?.toLowerCase().includes(value.toLowerCase()) ||
      countryisocode?.toLowerCase().includes(value.toLowerCase())
  );

  const filteredCities = data.cities.filter(({ name }) =>
    name.toLowerCase().includes(value.toLowerCase())
  );

  return { filteredHotels, filteredCountries, filteredCities };
};

function App() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchValue(event.target.value);

    if (!query) {
      setHotels([]);
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
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setHotels([]);
    setCountries([]); // Clear countries
    setCities([]); // Clear cities
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
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {!!hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? hotels.map((hotel, index) => (
                    <li key={index}>
                      <a href={`/hotels/${hotel._id}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </a>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  <p>No countries matched</p>
                  <h2>Cities</h2>
                  <p>No cities matched</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
