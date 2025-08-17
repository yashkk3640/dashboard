import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import LLMCaller from "../components/LLMCaller";

const About = () => (
  <Box p={8} textAlign="center">
    <Heading>About</Heading>
    <Text mt={4}>
      This is a sample dashboard using Vite, React, Chakra UI, and React Router.
    </Text>
    <LLMCaller />
  </Box>
);

export default About;
