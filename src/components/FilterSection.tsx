import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import {
  SELECT_EXPERIENCE,
  SELECT_JOB_ROLE,
  SELECT_PAY,
  SELECT_LOCATION,
} from "../constants";

interface FilterSectionComponentProps {
  onSetFilterValue: (type: string, value: string) => void;
}

const FilterSection: React.FC<FilterSectionComponentProps> = (props) => {
  const { onSetFilterValue } = props;
  return (
    <div className="filter-container">
      <Autocomplete
        disablePortal
        id="job-role"
        className="select-filter"
        options={SELECT_JOB_ROLE}
        sx={{ width: 220 }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
        onInputChange={(event, newInputValue) => {
          const value = SELECT_JOB_ROLE?.find(
            (item) => item?.label === newInputValue
          );
          onSetFilterValue("role", value?.id as string);
        }}
      />
      <Autocomplete
        disablePortal
        id="experience"
        options={SELECT_EXPERIENCE}
        sx={{ width: 220 }}
        className="select-filter"
        renderInput={(params) => <TextField {...params} label="Experience" />}
        onInputChange={(event, newInputValue) => {
          const value = SELECT_EXPERIENCE?.find(
            (item) => item?.label === newInputValue
          );
          onSetFilterValue("minExp", value?.id?.toString() as string);
        }}
      />
      <Autocomplete
        disablePortal
        id="experience"
        className="select-filter"
        options={SELECT_PAY}
        sx={{ width: 220 }}
        renderInput={(params) => (
          <TextField {...params} label="Min Base Pay Salary" />
        )}
        onInputChange={(event, newInputValue) => {
          const value = SELECT_PAY?.find(
            (item) => item?.label === newInputValue
          );

          onSetFilterValue("minBasePay", value?.id?.toString() as string);
        }}
      />
      <Autocomplete
        disablePortal
        id="experience"
        options={SELECT_LOCATION}
        sx={{ width: 220 }}
        className="select-filter"
        renderInput={(params) => <TextField {...params} label="Location" />}
        onInputChange={(event, newInputValue) => {
          const value = SELECT_LOCATION?.find(
            (item) => item?.label === newInputValue
          );
          onSetFilterValue("location", value?.id?.toString() as string);
        }}
      />
      <TextField
        id="company-name-input-box"
        label="Company Name"
        variant="outlined"
        sx={{ width: 220 }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onSetFilterValue("companyName", event.target.value);
        }}
      />
    </div>
  );
};

export default FilterSection;
