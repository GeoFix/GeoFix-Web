import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useUserContext } from '../hooks/useUserContext';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useUserContext();

  if (!user.uid) {
    return <Redirect to={{ pathname: '/login', state: { from: options.location } }} />
  }

  return <Route {...options} component={component} />;
};

export default PrivateRoute;
