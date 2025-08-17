import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const clgOptions = [
  { value: "VGEC", label: "VGEC" },
  { value: "DDU", label: "DDU" },
  { value: "DAIICT", label: "DAIICT" },
  { value: "MSU", label: "MSU" },
];

export const NumberEle = ({ name, value, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>{name}</FormLabel>
      <NumberInput
        value={value ?? 0}
        onChange={(val) => onChange(name, Number(val))}
      >
        <NumberInputField name={name} placeholder={`Enter ${name} name`} />
      </NumberInput>
    </FormControl>
  );
};

export const InputEle = ({ name, value, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>{name}</FormLabel>
      <Input
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={`Enter ${name} name`}
      />
    </FormControl>
  );
};

export const SelectEle = ({ name, value, onChange }) => (
  <FormControl isRequired>
    <FormLabel>{name}</FormLabel>
    <Select
      name={name}
      value={value ?? ""}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={`Select ${name}`}
    >
      {clgOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  </FormControl>
);

export const ButtonEle = ({ name, allFormValues, onReset }) => {
  const toast = useToast();
  return (
    <Button
      colorScheme="green"
      onClick={() => {
        toast({
          title: "Success, Values saved successfully",
          description: (
            <>
              Your values are stored as per below
              <br />
              {JSON.stringify(allFormValues, null, 2)}
            </>
          ),
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        onReset();
      }}
    >
      {name}
    </Button>
  );
};
