import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>

        <Route path="/movie"></Route>

        <Route path="/search">
          <Search />
        </Route>

        <Route path={["/", "/movies/:movieID"]}>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
