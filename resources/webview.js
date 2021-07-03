import React from "react";
import * as ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import AppContainer from "./components/AppContent.jsx";

const App = () => {
  return (
    <RecoilRoot>
      <AppContainer />
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
