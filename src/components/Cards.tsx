import React from "react";
import Card from "./Card";
import { CardsComponentProps } from "../types";

const CardsComponent: React.FC<CardsComponentProps> = (props) => {
  const { data, observerRef, onClickApplyLink } = props;
  return (
    <div className="main-container">
      <div className="cards-container">
        {data?.map((job, index) => (
          <Card
            key={`card-${index + 1}`}
            data={job}
            onClickApplyLink={onClickApplyLink}
            observerRef={observerRef}
          />
        ))}
        <div ref={observerRef} />
      </div>
    </div>
  );
};

export default CardsComponent;
