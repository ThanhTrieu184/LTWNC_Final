import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginLayout, PrivateLayout } from "./components/layouts";
import { PrivateRoute } from "./components";
import { Login, Error, Home } from "./pages";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={["/"]} exact>
          <PrivateLayout>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
            </Switch>
          </PrivateLayout>
        </Route>

        <Route path={["/login"]} exact>
          <LoginLayout>
            <Switch>
              <Route path="/login" exact component={Login} />
            </Switch>
          </LoginLayout>
        </Route>
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
