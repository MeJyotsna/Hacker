import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomeComponent from "./Components/Home";
import "./components/Home/css/componentStyle.css";

import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={HomeComponent} />
      </Switch>
    </Provider>
  );
}

export default App;
