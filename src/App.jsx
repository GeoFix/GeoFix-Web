import React from "react";
import { Switch, Route } from "react-router-dom";
import { MapLayout } from "./containers/MapLayout";
import { Create } from "./components/Create";

import "./App.css";

import BoxLayout from "./containers/BoxLayout/BoxLayout";
import LoginLayout from "./containers/LoginLayout/LoginLayout";
import PrivateRoute from "./utils/PrivateRoute";
import {useUserContext} from './hooks/useUserContext';
import {SplashScreen} from './components/SplashScreen/SplashScreen';

import illustration_bicycle from './assets/undraw_Ride_a_bicycle_2yok.svg';

export default function App() {
  const { isLoading: isUserLoading } = useUserContext();

  if (isUserLoading) {
    return <SplashScreen image={illustration_bicycle} message="Chargement..." blink />;
  }

  return (
    <Switch>
      <Route path="/login" component={LoginLayout} exact />
      <PrivateRoute path="/" component={MapLayout} exact />
      <PrivateRoute path="/create" component={Create} exact />
      <PrivateRoute path="/boxes/:id" component={BoxLayout} exact />
    </Switch>
  );
}
