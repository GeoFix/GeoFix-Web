import React, { Fragment } from 'react'
import { useBoxes } from "../../hooks/useBoxes";
import {Map} from "../../components/Map";

export default function MapLayout() {
  const { isLoading, boxes } = useBoxes();

  return (
    <Fragment>
      { isLoading ? (
        <div>Loading...</div>
      ) : (
        <Map markers={boxes.map(
          ({ geopoint, id }) => ({
            lat: geopoint.latitude,
            long: geopoint.longitude,
            id,
          })
        )} />
      )}
    </Fragment>
  )
}
