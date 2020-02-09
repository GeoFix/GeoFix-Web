import React, {Fragment, useState} from 'react'
import {Plus} from "react-feather";
import {useCurrentPosition} from "react-use-geolocation";
import {useHistory} from "react-router-dom";

import {useBoxes} from "../../hooks/useBoxes";
import {useTools} from "../../hooks/useTools";
import {RoundButton} from "../../UIElements/RoundButton";
import {Map} from "../../components/Map";
import {SplashScreen} from "../../components/SplashScreen/SplashScreen";
import SearchField from "../../components/SearchField/SearchField";

import './MapLayout.scss'

import illustration_localisation from '../../assets/undraw_location_search_bqps.svg';
import illustration_error from '../../assets/undraw_cancel_u1it.svg';
import illustration_search from '../../assets/undraw_searching_p5ux.svg';

export function MapLayout() {
  const [searchTools, setSearchTools] = useState([]);
  const {isLoading, boxes} = useBoxes(searchTools);
  const {tools} = useTools();
  const history = useHistory();

  const [position, error] = useCurrentPosition();

  const handleSearch = (values) => {
    setSearchTools(values.map(item => item.value));
  };

  const openBox = box => {
    history.push(`/boxes/${box.id}`);
  };

  if (!position && !error) {
    return <SplashScreen image={illustration_localisation} message="Localisation en cours..." blink/>;
  }

  return (
    <main className="map-layout">
      {
        !isLoading && boxes.length === 0 ? (
          <SplashScreen image={illustration_error} message="Aucune boites à outils aux alentours."/>
        ) : (
          isLoading ? (
            <SplashScreen image={illustration_search} message="Recherche des boites..." blink/>
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
        )
      }
      <SearchField
        name="tools-search"
        options={tools.map(tool => ({
          value: tool.id,
          label: tool.name,
        }))}
        onSearch={handleSearch}
      />
      <RoundButton icon={<Plus/>}/>
    </main>
  )
}
