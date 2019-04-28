import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';

import store from '../store';

const PrivateRoute = ({ component: Component, showMenu, ...options }) => (
  <Route
    {...options}
    render={properties => (store.getState().session.token ? (
      <>
        {showMenu && <NavBar />}
        <Component {...properties} />
      </>
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: properties.location } }} />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  showMenu: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  showMenu: true,
};

export default PrivateRoute;
