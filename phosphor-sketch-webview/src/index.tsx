import React from "react";
import * as ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import "./index.css";

import AppContainer from "./components/AppContent/AppContent";

const App: React.FC<{}> = () => {
  return (
    <RecoilRoot>
      <AppContainer />
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
