import React from "react";
import Dashboard from "./Dashboard";
import { DashboardProvider } from "./DashboardContext";
import Renderer from "./Renderer";
import { Box, Heading } from "@chakra-ui/react";

const DashboardScreen = () => {
  return (
    <DashboardProvider>
      <Box p={8}>
        <Heading mb={4} textAlign="center">
          Dashboard
        </Heading>
        <Box display="flex" gap={8}>
          <Box flex="1" maxW="50%">
            <Dashboard />
          </Box>
          <Box flex="1" maxW="50%">
            <Renderer />
          </Box>
        </Box>
      </Box>
    </DashboardProvider>
  );
};

export default DashboardScreen;
