import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";
import { Box, VStack } from "@chakra-ui/react";
import {
  ButtonEle,
  InputEle,
  NumberEle,
  SelectEle,
} from "../../components/Common";

const ELEMENT_MAP = {
  input: InputEle,
  number: NumberEle,
  select: SelectEle,
  button: ButtonEle,
};

const Renderer = () => {
  const { fieldConfig } = useDashboard();

  const [formValues, setFormValues] = useState({});
  return (
    <Box flex="1" maxW="100%">
      {/* {JSON.stringify(fieldConfig)}---
      {JSON.stringify(formValues)}--- */}
      <VStack spacing={4} align="stretch">
        {fieldConfig.map(({ name, type }) => {
          const Comp = ELEMENT_MAP[type];
          return (
            <Comp
              name={name}
              value={formValues[name]}
              allFormValues={formValues}
              onChange={(n, v) =>
                setFormValues((prev) => ({ ...prev, [n]: v }))
              }
              onReset={() => setFormValues({})}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default Renderer;
