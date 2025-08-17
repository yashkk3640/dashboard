import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { typeOptions } from "./dashboard.config";
import { useDashboard } from "./DashboardContext.jsx";

const Dashboard = () => {
  const [form, setForm] = useState({ name: "", type: "input" });
  const [fields, setFields] = useState([
    { name: "first name", type: "input" },
    { name: "last name", type: "input" },
    { name: "age", type: "number" },
    { name: "college", type: "select" },
    { name: "submit", type: "button" },
  ]);

  const { setFieldConfig } = useDashboard();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setFields((prev) => [...prev, form]);
    setForm({ name: "", type: "input" });
  };

  return (
    <>
      {/* Left Side: Form */}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter field name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select name="type" value={form.type} onChange={handleChange}>
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Add Field
          </Button>
        </VStack>
      </form>
      <Heading size="md" mt={2}>
        Fields
      </Heading>
      {fields.length === 0 ? (
        <Text color="gray.500">No fields added yet.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((field, idx) => (
              <Tr key={idx}>
                <Td>{field.name}</Td>
                <Td>{field.type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <VStack spacing={4} align="stretch">
        <Button colorScheme="green" onClick={() => setFieldConfig(fields)}>
          Render Field
        </Button>
      </VStack>
      {/* Right Side: Table */}
    </>
  );
};

export default Dashboard;
