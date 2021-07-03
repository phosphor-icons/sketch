import React from "react";

import StyleInput from "./StyleInput";
import SearchInput from "./SearchInput";

const Toolbar = () => {
  return (
    <menu className="toolbar" id="toolbar">
      <div className="toolbar-contents">
        <StyleInput />
        <SearchInput />
      </div>
    </menu>
  );
};

export default Toolbar;
