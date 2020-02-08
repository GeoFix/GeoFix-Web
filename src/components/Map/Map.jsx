import React, {useEffect, useState} from 'react';

import './Map.scss';
import 'ol/ol.css';

//OSM
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlMap from 'ol/Map';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat, transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';

/**
 * Map Component
 */
const Map = ({ markers, onMarkerClick }) => {
  const [ vectorSource, setVectorSource ] = useState();

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
    const map = new OlMap({
      target : "map",
      layers:[layer, newPinLayer],
      view : view
    });

    let first = true;

    map.on('singleclick', event => {
      const feature = map.forEachFeatureAtPixel(event.pixel, feature => {
        return feature;
      });

      var latLong = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
      // var lat     = latLong[1];
      // var long    = latLong[0];

      console.log(latLong);

      if (!feature) {
        return;
      }

      const [lat, long] = transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');

      onMarkerClick({
        id: feature.get('id'),
        lat,
        long,
      });
    });

    map.on('rendercomplete',  () => {
      if(first) {
        first = false;

        setVectorSource(vectorSource);
      }
    });
  }, [setVectorSource, onMarkerClick]);

  useEffect(() => {
    if (!vectorSource) {
      return;
    }

    vectorSource.clear();

    markers.forEach(({lat, long, id}) => {
      let iconFeature = new Feature({
        id,
        geometry: new Point(fromLonLat([long, lat])),
      });

      vectorSource.addFeature(iconFeature);
    });

    // iconFeature.setStyle(this.iconStyle);
  }, [markers, vectorSource]);

  return (
    <>
      <div id="map"/>
      <div className="map_copyright">
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
