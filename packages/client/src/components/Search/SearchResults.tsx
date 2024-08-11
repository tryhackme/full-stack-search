import type { Hotel } from "schemas";

export function SearchResults({ hotels }: { hotels: Hotel[] }) {
  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <h2>Hotels</h2>
      {!hotels.length ? (
        <p>No hotels matched</p>
      ) : (
        hotels.map((hotel, index) => (
          <li key={index}>
            <a href={`/hotels/${hotel._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {hotel.hotelName}
            </a>
            <hr className="divider" />
          </li>
        ))
      )}
    </div>
  );
}
