import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hotel, Country, City } from "../utils/types";
import { API_URL } from "../utils/constants";

interface DetailPageProps {
  type: "hotels" | "countries" | "cities";
}

async function fetchDetails(id: string, type: string) {
  const response = await fetch(`${API_URL}/${type}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch details");
  }
  return response.json();
}

const DetailPage: React.FC<DetailPageProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<Hotel | Country | City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);
    fetchDetails(id, type)
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, type]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  if (!details) return <p>No details found.</p>;

  return (
    <div>
      {type === "hotels" && (
        <div>
          <h1>{(details as Hotel).hotel_name}</h1>
          <div>Chain Name: {(details as Hotel).chain_name}</div>
          <div>City: {(details as Hotel).city}</div>
          <div>Country: {(details as Hotel).country}</div>
        </div>
      )}
      {type === "countries" && (
        <div>
          <h1>{(details as Country).country}</h1>
          <div>Country ISO Code: {(details as Country).countryisocode}</div>
        </div>
      )}
      {type === "cities" && (
        <div>
          <h1>{(details as City).name}</h1>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
