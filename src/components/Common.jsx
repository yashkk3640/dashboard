import { Input, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import React from "react";

const clgOptions = [
  { value: "VGEC", label: "VGEC" },
  { value: "DDU", label: "DDU" },
  { value: "DAIICT", label: "DAIICT" },
  { value: "MSU", label: "MSU" },
];

export const NumberEle = ({ name, value, onChange }) => {
  return (
    <NumberInput value={value} onChange={(val) => onChange(name, Number(val))}>
      <NumberInputField name={name} placeholder={`Enter ${name} name`} />
    </NumberInput>
  );
};

export const InputEle = ({ name, value, onChange }) => {
  return (
    <Input
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={`Enter ${name} name`}
    />
  );
};

export const SelectEle = ({ name, value, onChange }) => (
  <Select
    name={name}
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
  >
    {clgOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </Select>
);
