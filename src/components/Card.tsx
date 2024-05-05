import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getCurrencyType, truncateText } from "../util";
import { CardComponentProps } from "../types";

const Cards: React.FC<CardComponentProps> = (props) => {
  const { data, onClickApplyLink } = props;

  const [expand, setExpand] = useState(false);

  const getExpComponent = (minExp: number, maxExp: number) => {
    if (minExp && maxExp) {
      return (
        <div className="mt-10">
          <Typography className="md-text sub-title">
            Experience: {`${minExp}-${maxExp} years`}
          </Typography>
        </div>
      );
    } else if (minExp) {
      return (
        <div className="mt-10">
          <Typography className="md-text sub-title">
            Minimum Experience: {`${minExp} years`}
          </Typography>
        </div>
      );
    } else if (maxExp) {
      return (
        <div className="mt-10">
          <Typography className="md-text sub-title">
            Maximum Experience: {`${maxExp} years`}
          </Typography>
        </div>
      );
    }

    return <></>;
  };

  const getSalary = (minSalary: number, maxSalary: number) => {
    if (maxSalary && minSalary) return `${minSalary} - ${maxSalary} LPA`;
    if (maxSalary) return `${maxSalary} LPA`;
    if (minSalary) return `${minSalary} LPA`;
    return "-";
  };

  const truncate = truncateText(data?.jobDetailsFromCompany, 350);

  return (
    <Card className="card-container">
      <CardContent>
        <div className="card-header">
          <div className="logo">
            <img src={data?.logoUrl} alt="company-logo" />
          </div>
          <div>
            <Typography className="title">{data?.companyName}</Typography>
            <Typography className="sub-title">{data?.jobRole}</Typography>
          </div>
        </div>
        <div className="description">
          <Typography className="sub-title mt-10">
            Estimated Salary: {getCurrencyType(data?.salaryCurrencyCode)}
            {` ${getSalary(data?.minJdSalary, data?.maxJdSalary)}`} ✅
          </Typography>
          <Typography variant="h6" className="lg-text mt-10">
            About Company:
          </Typography>
          <Typography className="font-weight-bold md-text">About us</Typography>
          <Typography
            variant="body2"
            className="card-description-container mt-5"
          >
            {expand ? (
              <span>
                {data?.jobDetailsFromCompany}{" "}
                <span
                  role="presentation"
                  className="read-more-btn"
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  Show Less
                </span>
              </span>
            ) : (
              <span>
                {truncate?.str}{" "}
                <span
                  role="presentation"
                  className="read-more-btn"
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  Read More
                </span>
              </span>
            )}
          </Typography>
        </div>
        {getExpComponent(data?.minExp, data?.maxExp)}
        {data?.location && (
          <Typography className="md-text mt-10 text-transform-cap sub-title">
            Location: {data?.location}
          </Typography>
        )}
      </CardContent>
      <CardActions className="card-action-container">
        <Button
          className="easy-apply-btn"
          size="small"
          variant="contained"
          onClick={() => onClickApplyLink(data?.jdLink)}
        >
          ⚡ Easy Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
