import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import BrowseAlbums from './pages/BrowseAlbums';
import Header from './components/Header';
import { isConnected } from './services/spotifyConnect';

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/search">
            <Search />
          </PrivateRoute>
          <PrivateRoute exact path="/:artistId/albums">
            <BrowseAlbums />
          </PrivateRoute>
          <PrivateRoute exact path="*">
            <Redirect to="/" />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  const render = () => (isConnected() ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  ));

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={render}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
