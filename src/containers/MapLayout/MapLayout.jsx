import React, {Fragment, useState} from 'react'
import {Plus, Layers as LayersIcon} from "react-feather";
import {useCurrentPosition} from "react-use-geolocation";
import {useHistory} from "react-router-dom";

import {useBoxes} from "../../hooks/useBoxes";
import {useTools} from "../../hooks/useTools";
import {RoundButton} from "../../UIElements/RoundButton";
import {Map} from "../../components/Map";
import {SplashScreen} from "../../components/SplashScreen/SplashScreen";
import SearchField from "../../components/SearchField/SearchField";
import Layers from "../../components/Layers/Layers";

import './MapLayout.scss'

import illustration_localisation from '../../assets/undraw_location_search_bqps.svg';
import illustration_error from '../../assets/undraw_cancel_u1it.svg';
import illustration_search from '../../assets/undraw_searching_p5ux.svg';

export function MapLayout() {
  const [searchTools, setSearchTools] = useState([]);
  const [layers, setLayers] = useState({
    star: true,
    repair: true,
    retail: true,
  });
  const [layersOpen, setLayerOpen] = useState(false);

  const {isLoading, boxes} = useBoxes(searchTools);
  const {tools} = useTools();
  const history = useHistory();

  const [position, error] = useCurrentPosition();

  const handleSearch = (values) => {
    if (!values) {
      return setSearchTools([]);
    }

    return setSearchTools(values.map(item => item.value));
  };

  const openBox = box => {
    history.push(`/boxes/${box.id}`);
  };

  const renderMap = () => {
    if (isLoading) {
      return <SplashScreen image={illustration_search} message="Recherche des boites..." blink/>;
    }

    if (boxes.length === 0) {
      return <SplashScreen image={illustration_error} message="Aucune boites à outils aux alentours."/>;
    }

    return <Map
      position={position}
      markers={boxes.map(
        ({geopoint, id}) => ({
          lat: geopoint.latitude,
          long: geopoint.longitude,
          id,
        })
      )}
      onMarkerClick={openBox}
      displayLayerStar={layers.star}
      displayLayerRepair={layers.repair}
      displayLayerShop={layers.retail}
    />
  };

  if (!position && !error) {
    return <SplashScreen image={illustration_localisation} message="Localisation en cours..." blink/>;
  }

  return (
    <main className="map-layout">
      { renderMap() }

      <SearchField
        name="tools-search"
        options={tools.map(tool => ({
          value: tool.id,
          label: tool.name,
        }))}
        onSearch={handleSearch}
      />

      <button className="map-layout_open-layer" onClick={() => setLayerOpen(!layersOpen)}><LayersIcon /></button>
      {layersOpen && <Layers layers={layers} onLayersChange={setLayers} />}

      <RoundButton icon={<Plus/>}/>
    </main>
  )
}
