import { Link } from "react-router-dom";
import { Hotel, Country, City } from "../utils/types";

interface SearchResultsProps {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
  loading: boolean;
  error: string | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  hotels,
  countries,
  cities,
  loading,
//   error,
}) => (
  <>
    {!!hotels.length && !loading && (
      <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
        <h2>Hotels</h2>
        {hotels.length ? (
          hotels.map((hotel) => (
            <li key={hotel._id}>
              <Link to={`/hotels/${hotel._id}`} className="custom-link">
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
              <Link to={`/countries/${country._id}`} className="custom-link">
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
              <Link to={`/cities/${city._id}`} className="custom-link">
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
  </>
);

export default SearchResults;
