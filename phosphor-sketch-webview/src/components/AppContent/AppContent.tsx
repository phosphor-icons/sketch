import React, { Suspense, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { systemDarkModeAtom } from "../../state";
import Toolbar from "../Toolbar/Toolbar";
import IconGrid from "../IconGrid/IconGrid";
import Footer from "../Footer/Footer";

const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const AppContainer: React.FC<{}> = () => {
  const setDarkMode = useSetRecoilState(systemDarkModeAtom);

  useEffect(() => {
    setDarkMode(darkMediaQuery.matches);
    try {
      darkMediaQuery.addEventListener("change", (e) => {
        setDarkMode(e.matches);
        window.postMessage("changeSystemTheme", `${e.matches}`);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="app">
      <Toolbar />
      <Suspense fallback={<p>Loading...</p>}>
        <IconGrid />
      </Suspense>
      <Footer />
    </div>
  );
};

export default AppContainer;
