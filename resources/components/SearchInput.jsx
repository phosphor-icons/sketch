import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDebounce } from "react-use";
import { X, HourglassHigh } from "@phosphor-icons/react";

import { searchQueryAtom, systemDarkModeAtom } from "../state";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useRecoilState(searchQueryAtom);
  const isDarkMode = useRecoilValue(systemDarkModeAtom);
  void query;

  const inputStyle = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "#2B2A28" : "transparent",
  };

  const [isReady] = useDebounce(() => setQuery(value), 250, [value]);

  const handleCancelSearch = () => {
    setValue("");
    // Should cancel pending debounce timeouts and immediately clear query
    // without causing lag!
    // setQuery("");
  };

  return (
    <div className="search-bar" style={inputStyle}>
      <input
        id="search-input"
        title="Search for icon names, categories, or keywords"
        aria-label="Search for an icon"
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        value={value}
        placeholder="Search"
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        onKeyPress={({ currentTarget, key }) =>
          key === "Enter" && currentTarget.blur()
        }
      />
      {value ? (
        isReady() ? (
          <X className="clear-icon" size={18} onClick={handleCancelSearch} />
        ) : (
          <HourglassHigh className="wait-icon" weight="fill" size={18} />
        )
      ) : null}
    </div>
  );
};

export default SearchInput;
