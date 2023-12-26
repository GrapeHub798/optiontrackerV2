import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { APP_URL_PATHS } from "../shared/sharedConstants";

export const AuthRoute = ({ children }) => {
  const { user: authUser } = useSelector((x) => x.user);

  if (!authUser) {
    // not logged in so redirect to login page with the return url
    return (
      <Navigate to={APP_URL_PATHS.LOGIN} state={{ from: history.location }} />
    );
  }

  // authorized so return child components
  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.any,
};
