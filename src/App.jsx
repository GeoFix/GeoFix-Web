import React from 'react';

import './App.css';

import { Map } from "./components/Map/Map";
import {useBoxes} from "./hooks/useBoxes";
import {useCurrentPosition} from "react-use-geolocation";

function App() {
  const {isLoading, boxes} = useBoxes();
  const [position, error] = useCurrentPosition();

  console.log('position', position);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Map
        position={position}
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
