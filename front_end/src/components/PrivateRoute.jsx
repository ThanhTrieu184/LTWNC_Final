import React from "react";
import { Route, Redirect } from "react-router-dom";
import { exceptionConstants } from "../constants";

const { SUCCESS, UNAUTHENTICATED } = exceptionConstants;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return UNAUTHENTICATED;
    }
    return SUCCESS;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin() === UNAUTHENTICATED) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
