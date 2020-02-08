import React from 'react';

import './App.css';

import { Map } from "./components/Map/Map";
import {useBoxes} from "./hooks/useBoxes";

function App() {
  const {isLoading, boxes} = useBoxes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Map markers={boxes.map(box => {
        return {
          lat: box.geopoint.latitude,
          long: box.geopoint.longitude,
          id: box.id,
        }
      })} />
    </>
  );
}

export default App;
