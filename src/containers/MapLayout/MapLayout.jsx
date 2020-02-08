import React, {Fragment} from 'react'
import {Plus} from "react-feather";
import {useCurrentPosition} from "react-use-geolocation";
import { useHistory } from "react-router-dom";

import {useBoxes} from "../../hooks/useBoxes";
import {RoundButton} from "../../UIElements/RoundButton";
import {Map} from "../../components/Map";

import './MapLayout.css'

export function MapLayout() {
  const {isLoading, boxes} = useBoxes();
  const history = useHistory();

  const [position, error] = useCurrentPosition();

  const openBox = box => {
    history.push(`/boxes/${box.id}`);
  };

  if (!position && !error) {
    return <div>Loading Position...</div>;
  }

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <Map
            position={position}
            markers={boxes.map(
              ({geopoint, id}) => ({
                lat: geopoint.latitude,
                long: geopoint.longitude,
                id,
              })
            )}
            onMarkerClick={openBox}
          />
          <RoundButton icon={<Plus/>}/>
        </Fragment>
      )}
    </Fragment>
  )
}
