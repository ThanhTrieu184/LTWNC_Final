import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginLayout, PrivateLayout } from "./components/layouts";
import { PrivateRoute } from "./components";
import {
  Login,
  Error,
  Home,
  CreateUser,
  AnnouncementPage,
  AnnouncementDetail,
  CreateAnnouncement,
  CreatePost,
  Profile,
} from "./pages";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path={[
            "/",
            "/users/create",
            "/announcements",
            "/announcements/:departmentId",
            "/announcements/:announcementId/detail",
            "/announcements/:announcementId/edit",
            "announcements/create",
            "/posts/create",
            "/posts/:postId/edit",
            "/users/:userId/profile",
          ]}
          exact
        >
          <PrivateLayout>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute
                path="/users/create"
                exact
                roles={["Admin"]}
                component={CreateUser}
              />
              <PrivateRoute
                path="/users/:userId/profile"
                exact
                component={Profile}
              />
              <PrivateRoute
                path="/announcements/create"
                component={CreateAnnouncement}
                roles={["Department"]}
              />
              <PrivateRoute
                path={["/announcements", "/announcements/:departmentId"]}
                exact
                component={AnnouncementPage}
              />
              <PrivateRoute
                path="/announcements/:announcementId/detail"
                component={AnnouncementDetail}
              />
              <PrivateRoute
                path="/announcements/:announcementId/edit"
                component={CreateAnnouncement}
              />
              <PrivateRoute path="/posts/create" exact component={CreatePost} />
              <PrivateRoute
                path="/posts/:postId/edit"
                exact
                component={CreatePost}
              />
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
