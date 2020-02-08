import React, {useEffect, useState} from 'react';

import './Map.scss';
import 'ol/ol.css';

//OSM
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlMap from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';

/**
 * Map Component
 */
const Map = ({ markers }) => {
  const [ map, setMap ] = useState();

  useEffect(() => {
    // Create open street map layer
    let source = new OlXYZ({
      url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    });

    let layer = new OlTileLayer({
      source: source
    });

    let view = new OlView({
      center: fromLonLat([-1.6777926,48.117266]),
      zoom: 13
    });

    let vectorSource = new VectorSource(/*{
      features: [iconFeature]
    }*/);

    let newPinLayer = new VectorLayer({
      source: vectorSource
    });

    //Init map
    setMap(new OlMap({
      target : "map",
      layers:[layer, newPinLayer],
      view : view
    }));
  }, []);

  useEffect(() => {

  }, [markers, map]);

  return (
    <>
      <div id="map"/>
      <div className="copyright">
        &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
        Tiles style by <a href="https://www.hotosm.org/" target="_blank" rel="noopener noreferrer" >Humanitarian OpenStreetMap Team</a>
        hosted by <a href="https://openstreetmap.fr/" target="_blank" rel="noopener noreferrer" >OpenStreetMap France</a>
      </div>
    </>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export { Map };
