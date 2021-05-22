import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CalendarScreen from "../calendar/CalendarScreen";
import LoginScreen from "../auth/LoginScreen";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CalendarScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
