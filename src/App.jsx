import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MapLayout } from "./containers/MapLayout";

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MapLayout />
        </Route>
        <Route path="/create">
          <p>bla</p>
        </Route>
      </Switch>
    </Router>
  );
}
