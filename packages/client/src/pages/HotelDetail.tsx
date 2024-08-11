import React from "react";
import { useParams } from "react-router-dom";

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Hotel Detail</h1>
      <p>Hotel ID: {id}</p>
    </div>
  );
};

export default HotelDetail;
