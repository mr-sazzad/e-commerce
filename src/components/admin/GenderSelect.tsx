"use client";

import Select from "react-select";
import { OptionType } from "@/types";

interface MySelectProps {
  onSelectChange: (selectedOption: OptionType | null) => void;
}

const options: OptionType[] = [
  { value: "Male", label: "♂️ Male" },
  { value: "Female", label: "♀️ Female" },
  { value: "Others", label: "⚧️ Other" },
];

const GenderSelect = ({ onSelectChange }: MySelectProps) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "1px solid #D1D5DB",
      padding: "0px 12px",
      borderRadius: "0px",
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
        onChange={handleSelect}
      />
    </div>
  );
};

export default GenderSelect;
