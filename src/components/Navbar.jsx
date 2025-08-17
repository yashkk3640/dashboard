import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Spacer, Button } from "@chakra-ui/react";

const Navbar = () => (
  <Box bg="blue.600" px={4} py={2} color="white">
    <Flex align="center">
      <Link
        as={RouterLink}
        to="/"
        fontWeight="bold"
        fontSize="xl"
        color="white"
      >
        Dashboard
      </Link>
      <Spacer />
      <Link as={RouterLink} to="/chat" mx={2} color="white">
        LLM Chat
      </Link>
      <Link as={RouterLink} to="/about" mx={2} color="white">
        About
      </Link>
      <Link as={RouterLink} to="/dashboard" mx={2} color="white">
        Dashboard
      </Link>
      <Button as={RouterLink} to="/" ml={4} colorScheme="teal" size="sm">
        Home
      </Button>
    </Flex>
  </Box>
);

export default Navbar;
