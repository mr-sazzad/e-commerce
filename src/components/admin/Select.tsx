"use client";

import Select from "react-select";
import { useState, FocusEventHandler } from "react";
import { OptionType } from "@/types";

interface MySelectProps {
  onSelectChange: (selectedOption: OptionType | null) => void;
}

const options: OptionType[] = [
  { value: "Available", label: "✅ Available" },
  { value: "Unavailable", label: "❎ Un-Available" },
];

const MySelect = ({ onSelectChange }: MySelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "1px solid #D1D5DB",
      padding: "0px 12px",
      borderRadius: "0px",
      outline: isFocused ? "none" : "",
    }),
    option: (provided: any) => ({
      ...provided,
    }),
  };

  const handleSelect: (selectedOption: OptionType | null) => void = (
    selectedOption
  ) => {
    onSelectChange(selectedOption);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <label className="absolute top-0 left-3 text-gray-500" htmlFor="select">
        Status
      </label>
      <Select
        id="select"
        options={options}
        className="w-full"
        styles={customStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSelect}
      />
    </div>
  );
};

export default MySelect;
