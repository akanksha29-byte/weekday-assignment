import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardComponentProps } from "../types";
import { Typography } from "@mui/material";

const Cards: React.FC<CardComponentProps> = (props) => {
  const { data } = props;

  const getExpComponent = (minExp: number, maxExp: number) => {
    if (minExp && maxExp) {
      return (
        <div>
          <div>Experience</div>
          <div>{`${minExp}-${maxExp} years`}</div>
        </div>
      );
    } else if (minExp) {
      return (
        <div>
          <div>Experience</div>
          <div>{`${minExp} years`}</div>
        </div>
      );
    } else if (maxExp) {
      return (
        <div>
          <div>Experience</div>
          <div>{`${maxExp} years`}</div>
        </div>
      );
    }

    return <></>;
  };
  return (
    <Card className="card-container" sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="card-header">
          <div className="logo">
            <img src={data?.logoUrl} alt="company-logo" />
          </div>
          <div>
            <div className="title">{data?.companyName}</div>
            <div className="sub-title">{data?.jobRole}</div>
          </div>
        </div>
        <div className="description">
          <Typography variant="h6" className="md-text">
            About Company:
          </Typography>
          <Typography>About us</Typography>
          {data?.jobDetailsFromCompany}
        </div>
        {getExpComponent(data?.minExp, data?.maxExp)}
      </CardContent>
      <CardActions>
        <Button className="easy-apply-btn" size="small" variant="contained">
          Easy Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
