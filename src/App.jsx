import React from "react";
import { ChakraProvider, defaultSystem, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <ChakraProvider value={defaultSystem}>
    <Router>
      <Navbar />
      <Box as="main" pt={6} minH="80vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
    </Router>
  </ChakraProvider>
);

export default App;
