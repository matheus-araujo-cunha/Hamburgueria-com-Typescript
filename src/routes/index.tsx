import { Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Route } from "./Route";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};
