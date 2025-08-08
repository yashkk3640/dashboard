import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";
import { Box } from "@chakra-ui/react";
import { InputEle, NumberEle, SelectEle } from "../../components/Common";

const ELEMENT_MAP = {
  input: InputEle,
  number: NumberEle,
  select: SelectEle,
};

const Renderer = () => {
  const { fieldConfig } = useDashboard();

  const [formValues, setFormValues] = useState({});
  return (
    <Box flex="1" maxW="50%">
      {JSON.stringify(fieldConfig)}---
      {JSON.stringify(formValues)}---
      {fieldConfig.map(({ name, type }) => {
        const Comp = ELEMENT_MAP[type];
        return (
          <Comp
            name={name}
            value={formValues[name]}
            onChange={(n, v) => setFormValues((prev) => ({ ...prev, [n]: v }))}
          />
        );
      })}
    </Box>
  );
};

export default Renderer;
