import React from "react";
import { useRecoilValue } from "recoil";
import { IconContext, SmileyXEyes } from "@phosphor-icons/react";

import { systemDarkModeAtom } from "../state";

import {
  iconWeightAtom,
  filteredQueryResultsSelector,
  searchQueryAtom,
} from "../state";

const IconGrid = () => {
  const weight = useRecoilValue(iconWeightAtom);
  const icons = useRecoilValue(filteredQueryResultsSelector);
  const query = useRecoilValue(searchQueryAtom);
  const isDarkMode = useRecoilValue(systemDarkModeAtom);

  const color = isDarkMode ? "white" : "black";

  const handleCopyToWorkspace = (event, name) => {
    const element = event.currentTarget.cloneNode(true);
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "256");
    rect.setAttribute("height", "256");
    rect.setAttribute("fill", "none");
    element.appendChild(rect);
    window.postMessage(
      "insertIcon",
      JSON.stringify({ name, svg: element.outerHTML })
    );
  };

  if (!icons.length)
    return (
      <div className="empty-state" style={{ color }}>
        <SmileyXEyes
          size={128}
          weight="duotone"
          color={isDarkMode ? "#3F3C47" : "#2C2C2C"}
        />
        <p>
          No results for <code>"{query}"</code>
        </p>
      </div>
    );

  return (
    <div className="grid">
      <IconContext.Provider
        value={{ size: 32, color, weight, mirrored: false }}
      >
        {icons.map(({ Icon }) => (
          <span key={Icon.displayName} title={Icon.displayName}>
            <Icon
              className="icon"
              key={Icon.displayName}
              onClick={(event) =>
                handleCopyToWorkspace(event, Icon.displayName ?? "Icon")
              }
            />
          </span>
        ))}
      </IconContext.Provider>
    </div>
  );
};

export default IconGrid;
