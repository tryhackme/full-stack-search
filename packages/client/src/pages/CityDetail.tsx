import React from "react";
import { useParams } from "react-router-dom";

const CityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>City Detail</h1>
      <p>City ID: {id}</p>
    </div>
  );
};

export default CityDetail;
