import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Country } from "schemas";
import { InternalBox } from "../components/InternalBox";
import { getCountryById } from "../services/countries/get-country";

export default function CountryDetails() {
  const { id } = useParams<{ id: string }>();

  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const fetchedCountry = await getCountryById(id);
        setCountry(fetchedCountry);
      } catch (err) {
        setError("Failed to fetch country details.");
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

  if (!country)
    return (
      <InternalBox>
        <h3 className="text-center">No country found</h3>
      </InternalBox>
    );

  return (
    <InternalBox>
      <h1 className="mb-4">{country.country}</h1>
      <div className="mb-3">
        <p>
          <strong>Country:</strong> {country.country}
        </p>
        <p>
          <strong>ISO Code:</strong> {country.countryIsoCode}
        </p>
      </div>
    </InternalBox>
  );
}
