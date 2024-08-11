import React from "react";
import { useParams } from "react-router-dom";

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Country Detail</h1>
      <p>Country ID: {id}</p>
    </div>
  );
};

export default CountryDetail;
