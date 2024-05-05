import React from "react";
import Card from "./Card";
import { CardsComponentProps } from "../types";

const CardsComponent: React.FC<CardsComponentProps> = (props) => {
  const { data, observerRef, onClickApplyLink } = props;
  return (
    <div className="main-container">
      <div className="cards-container" ref={observerRef}>
        {data?.map((job, index) => (
          <Card
            key={`card-${index + 1}`}
            data={job}
            onClickApplyLink={onClickApplyLink}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsComponent;
