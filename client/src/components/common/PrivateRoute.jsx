/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isValidElementType } from 'react-is';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated && props.location.pathname !== "/register") {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line consistent-return
  component: (props, propName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        "Invalid prop 'component' supplied to 'Route': the prop is not a valid React component",
      );
    }
  },
};

PrivateRoute.defaultProps = {
  component: () => {},
};

export default PrivateRoute;
