import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import LayoutContainer from "../layout/Layout";
import Login from "../login/Login";
import Register from "../register/Register";
import PrivateRoute from "../common/PrivateRoute";

export default function IndexRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/" component={LayoutContainer} />
    </Switch>
  );
}
