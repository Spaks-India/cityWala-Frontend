
import Select from "react-select";

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  valueKey = "value",
  labelKey = "label",
}) => {

  const formattedOptions = options.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      borderColor: "#ddd",
      color: "#333",
      minHeight: "38px",
      fontSize: "14px",
      borderRadius: "6px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
      fontSize: "14px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#999",
      fontSize: "14px",
    }),
    input: (base) => ({
      ...base,
      color: "#333",
      fontSize: "14px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#1075be" : state.isFocused ? "#f0f0f0" : "#fff",
      color: state.isSelected ? "#fff" : "#333",
      cursor: "pointer",
      fontSize: "14px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
      zIndex: 9999,
    }),
  };

  return (
    <Select
      options={formattedOptions}
      placeholder={placeholder}
      isSearchable
      maxMenuHeight={200}
      value={
        formattedOptions.find(
          (option) => option.value === value
        ) || null
      }
      onChange={(selected) =>
        onChange(selected?.value || "")
      }
      styles={customStyles}
    />
  );
};

export default SearchableSelect;

