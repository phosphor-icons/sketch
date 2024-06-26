import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Select from "react-dropdown-select";
import { IconStyle } from "@phosphor-icons/core";
import { CaretDown, CaretUp, PencilLine } from "@phosphor-icons/react";

import { iconWeightAtom, systemDarkModeAtom } from "../state";

const options = [
  {
    key: "Thin",
    value: IconStyle.THIN,
    icon: <PencilLine size={24} weight="thin" />,
  },
  {
    key: "Light",
    value: IconStyle.LIGHT,
    icon: <PencilLine size={24} weight="light" />,
  },
  {
    key: "Regular",
    value: IconStyle.REGULAR,
    icon: <PencilLine size={24} weight="regular" />,
  },
  {
    key: "Bold",
    value: IconStyle.BOLD,
    icon: <PencilLine size={24} weight="bold" />,
  },
  {
    key: "Fill",
    value: IconStyle.FILL,
    icon: <PencilLine size={24} weight="fill" />,
  },
  {
    key: "Duotone",
    value: IconStyle.DUOTONE,
    icon: <PencilLine size={24} weight="duotone" />,
  },
];

const StyleInput = () => {
  const [style, setStyle] = useRecoilState(iconWeightAtom);
  const isDarkMode = useRecoilValue(systemDarkModeAtom);

  const inputStyle = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "#2B2A28" : "transparent",
  };

  const handleStyleChange = (values) => setStyle(values[0].value);

  return (
    <Select
      options={options}
      values={[options.find((o) => o.value === style) ?? options[2]]}
      searchable={false}
      labelField="key"
      onChange={handleStyleChange}
      style={inputStyle}
      itemRenderer={({
        item,
        itemIndex,
        state: { cursor, values },
        methods,
      }) => (
        <span
          role="option"
          aria-selected={item.key === values[0].key}
          className={`react-dropdown-select-item ${
            itemIndex === cursor ? "react-dropdown-select-item-active" : ""
          }`}
          onClick={() => methods.addItem(item)}
        >
          {item.icon}
          {item.key}
        </span>
      )}
      contentRenderer={({ state: { values } }) => (
        <div className="react-dropdown-select-content">
          {values[0].icon}
          {values[0].key}
        </div>
      )}
      dropdownHandleRenderer={({ state }) =>
        state.dropdown ? <CaretUp /> : <CaretDown />
      }
    />
  );
};

export default StyleInput;
