import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "../App";
import { getToken } from "./utils/localStorage";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact render={() => <Redirect to="/home" />} />
      <Route path="/home" exact component={Homepage} />
      <Route path="/home/:id" exact component={Homepage} />
    </Router>
  );
};

export default AppRouter;
