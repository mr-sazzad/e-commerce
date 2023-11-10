import React from "react";
import Select from "react-select";

export interface OptionType {
  value: string | number;
  label: string;
}

type SetSizeType = (size: number | null) => void;

interface PageSelectProps {
  setSize: SetSizeType;
}

const PageSelect: React.FC<PageSelectProps> = ({ setSize }) => {
  const options: OptionType[] = [
    { value: 3, label: "3️⃣ Three Items" },
    { value: 5, label: "5️⃣ Five Items" },
    { value: 10, label: "🔟 Ten Items" },
  ];

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

  const handleSelect = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const selectedValue =
        typeof selectedOption.value === "string"
          ? parseInt(selectedOption.value)
          : selectedOption.value;
      setSize(selectedValue);
    } else {
      setSize(null);
    }
  };

  return (
    <Select
      options={options}
      className="w-full"
      styles={customStyles}
      onChange={handleSelect}
    />
  );
};

export default PageSelect;
