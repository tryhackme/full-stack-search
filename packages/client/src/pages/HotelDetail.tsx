import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../services/hotels/get-hotel";
import type { Hotel } from "schemas";
import { StarRating } from "../components/StarRating";
import { InternalBox } from "../components/InternalBox";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();

  const [hotel, setHotel] = useState<Hotel | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const fetchedHotel = await getHotelById(id);
        setHotel(fetchedHotel);
      } catch (err) {
        setError("Failed to fetch hotel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading)
    return (
      <InternalBox>
        <h3 className="text-center">Loading...</h3>
      </InternalBox>
    );

  if (error)
    return (
      <InternalBox>
        <p>{error}</p>
      </InternalBox>
    );

  if (!hotel)
    return (
      <InternalBox>
        <h3 className="text-center">No hotel found</h3>
      </InternalBox>
    );

  return (
    <InternalBox>
      <h1 className="mb-4">{hotel.hotelName}</h1>
      <div className="mb-3">
        {hotel.chainName && (
          <p>
            <strong>Chain Name:</strong> {hotel.chainName}
          </p>
        )}
        <p>
          <strong>Address Line 1:</strong> {hotel.addressLine1}
        </p>
        {hotel.addressLine2 && (
          <p>
            <strong>Address Line 2:</strong> {hotel.addressLine2}
          </p>
        )}
        <p>
          <strong>City:</strong> {hotel.city}
        </p>
        {hotel.state && (
          <p>
            <strong>State/Province:</strong> {hotel.state}
          </p>
        )}
        {hotel.zipCode && (
          <p>
            <strong>Zip/Postal Code:</strong> {hotel.zipCode}
          </p>
        )}
        <p>
          <strong>Country:</strong> {hotel.country} ({hotel.countryIsoCode})
        </p>
      </div>

      <div className="d-flex flex-column">
        <p className="m-0">
          <strong>Classification:</strong>
        </p>
        <StarRating rating={hotel.starRating} />
      </div>
    </InternalBox>
  );
}
