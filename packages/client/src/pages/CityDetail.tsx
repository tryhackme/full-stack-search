import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { City } from "schemas";
import { InternalBox } from "../components/InternalBox";
import { getCityById } from "../services/cities/get-city";

export default function CityDetail() {
  const { id } = useParams<{ id: string }>();

  const [city, setCity] = useState<City | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const fetchedCity = await getCityById(id);
        setCity(fetchedCity);
      } catch (err) {
        setError("Failed to fetch city details.");
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

  if (!city)
    return (
      <InternalBox>
        <h3 className="text-center">No city found</h3>
      </InternalBox>
    );

  return (
    <InternalBox>
      <h1 className="mb-4">{city.name}</h1>
      <div className="mb-3">
        <p>
          <strong>City:</strong> {city.name}
        </p>
      </div>
    </InternalBox>
  );
}
