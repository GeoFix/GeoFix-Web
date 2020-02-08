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
import {fromLonLat, transform} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';

/**
 * Map Component
 */
const Map = ({markers, onMarkerClick, position}) => {
  const [vectorSource, setVectorSource] = useState();
  const [map, setMap] = useState();

  let mounted = true;

  useEffect(() => {
    // Create open street map layer
    let source = new OlXYZ({
      url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    });

    let layer = new OlTileLayer({
      source: source
    });

    let view = new OlView({
      center: fromLonLat([-1.6777926, 48.117266]),
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
      target: "map",
      layers: [layer, newPinLayer],
      view: view
    });

    let first = true;

    map.on('singleclick', event => {
      if (!onMarkerClick) {
        return;
      }

      const feature = map.forEachFeatureAtPixel(event.pixel, feature => {
        return feature;
      });

      if (!feature) {
        return;
      }

      const [lat, long] = transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
      const id = feature.get('id');

      if (!id) {
        return;
      }

      onMarkerClick({
        id,
        lat,
        long,
      });
    });

    map.on('rendercomplete', () => {
      if (first) {
        first = false;

        if (mounted) {
          setVectorSource(vectorSource);
        }
      }
    });

    setMap(map);

    return () => {
      mounted = false;
    }
  }, []);

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

  useEffect(() => {
    if (!position || !vectorSource || !map) {
      return;
    }

    const {latitude, longitude} = position.coords;

    let iconFeature = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    vectorSource.addFeature(iconFeature);

    // Center to map
    let size = map.getSize();
    map.getView().centerOn(fromLonLat([longitude,latitude]), size, [window.innerWidth / 2, window.innerHeight / 2]);
  }, [position, vectorSource, map]);

  return (
    <>
      <div id="map" className="map"/>
      <div className="map_copyright">
        &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
        Tiles style by <a href="https://www.hotosm.org/" target="_blank" rel="noopener noreferrer">Humanitarian
        OpenStreetMap Team</a>
        hosted by <a href="https://openstreetmap.fr/" target="_blank" rel="noopener noreferrer">OpenStreetMap France</a>
      </div>
    </>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export {Map};
