import React, { Fragment } from 'react'
import { Plus } from "react-feather";

import { useBoxes } from "../../hooks/useBoxes";
import { RoundButton}  from "../../UIElements/RoundButton";
import { Map } from "../../components/Map";

import './MapLayout.css'

export function MapLayout() {
  const { isLoading, boxes } = useBoxes();

  return (
    <Fragment>
      { isLoading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <Map markers={boxes.map(
            ({ geopoint, id }) => ({
              lat: geopoint.latitude,
              long: geopoint.longitude,
              id,
            })
          )} />
          <RoundButton icon={<Plus />} />
        </Fragment>
      )}
    </Fragment>
  )
}
