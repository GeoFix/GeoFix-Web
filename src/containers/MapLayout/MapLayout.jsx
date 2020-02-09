import React, {Fragment} from 'react'
import {Plus} from "react-feather";
import {useCurrentPosition} from "react-use-geolocation";
import {useHistory} from "react-router-dom";

import {useBoxes} from "../../hooks/useBoxes";
import {RoundButton} from "../../UIElements/RoundButton";
import {Map} from "../../components/Map";
import {SplashScreen} from "../../components/SplashScreen/SplashScreen";

import './MapLayout.css'

import illustration_localisation from '../../assets/undraw_location_search_bqps.svg';
import illustration_error from '../../assets/undraw_cancel_u1it.svg';

export function MapLayout() {
  const {isLoading, boxes} = useBoxes();
  const history = useHistory();

  const [position, error] = useCurrentPosition();

  const openBox = box => {
    history.push(`/boxes/${box.id}`);
  };

  if (!position && !error) {
    return <SplashScreen image={illustration_localisation} message="Localisation en cours..." blink />;
  }

  return (
    <Fragment>
      {
        !isLoading && boxes.length === 0 ? (
          <SplashScreen image={illustration_error} message="Aucune boites à outils aux alentours."/>
        ) : (
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
        )
      }
      <RoundButton icon={<Plus/>}/>
    </Fragment>
  )
}
