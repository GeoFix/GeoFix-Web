import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Map } from "./components/Map";
import { useBoxes } from "./hooks/useBoxes";

import './App.css';

export default function App() {
  const { isLoading, boxes } = useBoxes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Map markers={boxes.map(({ geopoint, id }) => ({
            lat: geopoint.latitude,
            long: geopoint.longitude,
            id,
          }))} />
        </Route>
        <Route path="/create">
          <p>bla</p>
        </Route>
      </Switch>
    </Router>
  );
}
