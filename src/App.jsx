import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MapLayout } from "./containers/MapLayout";
import { Create } from "./components/Create";

import './App.css';
import BoxLayout from "./containers/BoxLayout/BoxLayout";
import LoginLayout from './containers/LoginLayout/LoginLayout';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MapLayout />
        </Route>
        <Route path="/login">
          <LoginLayout/>
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/boxes/:id">
          <BoxLayout />
        </Route>
      </Switch>
    </Router>
  );
}
