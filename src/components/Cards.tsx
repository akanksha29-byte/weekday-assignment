import React from "react";
import Card from "./Card";
import { CardsComponentProps } from "../types";

const CardsComponent: React.FC<CardsComponentProps> = (props) => {
  const { data } = props;
  return (
    <div className="main-container">
      {data?.map((job, index) => (
        <Card key={`card-${index + 1}`} data={job} />
      ))}
    </div>
  );
};

export default CardsComponent;
