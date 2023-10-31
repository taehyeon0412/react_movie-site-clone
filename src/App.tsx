import React, { useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import { useSetRecoilState } from "recoil";
import { windowWidth } from "./atoms";
import Movie from "./Routes/Movie";

function App() {
  const setWidth = useSetRecoilState(windowWidth);
  useEffect(() => {
    const debouncedResizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, [setWidth]);

  useEffect(() => {
    const preventGoBack = () => {
      window.history.go(1);
      console.log("prevent go back!");
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, []);
  //뒤로가기 막기

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path={["/tv", "/tv/:listType/:movieID"]}>
          <Tv />
        </Route>

        <Route path={["/movie", "/movie/:listType/:movieID"]}>
          <Movie />
        </Route>

        <Route path={["/search", "/search/:menuName/:movieID"]}>
          <Search />
        </Route>

        <Route path={["/", "/home/:listType/:movieID"]}>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
