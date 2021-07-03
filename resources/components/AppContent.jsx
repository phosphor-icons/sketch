import React, { Suspense, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { systemDarkModeAtom } from "../state";
import Toolbar from "./Toolbar";
import IconGrid from "./IconGrid";
import Footer from "./Footer";

const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const AppContainer = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
