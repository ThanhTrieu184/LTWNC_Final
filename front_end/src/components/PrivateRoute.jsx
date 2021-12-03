import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyUser } from "../redux/slices";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(verifyUser());
    }
  }, [dispatch, user]);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/login" />;
        } else if (roles && !roles.includes(user.role)) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
