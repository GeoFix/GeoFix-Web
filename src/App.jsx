import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MapLayout } from "./containers/MapLayout";
import { Create } from "./components/Create";

import './App.css';
import BoxLayout from "./containers/BoxLayout/BoxLayout";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MapLayout />
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
