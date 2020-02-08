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
      <Map
        markers={boxes.map(box => {
          return {
            lat: box.geopoint._lat,
            long: box.geopoint._long,
            id: box.id,
          }
        })}
        onMarkerClick={box => console.log(box)}
      />
    </>
  );
}

export default App;
