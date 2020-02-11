import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import './Map.scss'
import 'ol/ol.css'

// OSM
import OlXYZ from 'ol/source/XYZ'
import OlTileLayer from 'ol/layer/Tile'
import OlView from 'ol/View'
import OlMap from 'ol/Map'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { fromLonLat, transform } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import { Vector as VectorLayer } from 'ol/layer'
import { Icon, Style } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'

import Geolocation from 'ol/Geolocation'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import pin_repair from '../../assets/pin_repair.png'
import pin_shop from '../../assets/pin_shop.png'
import pin_star from '../../assets/pin_star.png'
import pin_toolbox_select from '../../assets/pin_toolbox_select.png'

import bicycle_rental from '../../assets/bicycle_rental.geojson'
import bicycle_repair_station from '../../assets/bicycle_repair_station.geojson'
import store_bicycle from '../../assets/store_bicycle.geojson'

const iconStyleSelect = new Style({
  image: new Icon({
    anchor: [14, 32],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    src: pin_toolbox_select,
  }),
})
const iconStyleRepair = new Style({
  image: new Icon({
    anchor: [14, 32],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    src: pin_repair,
  }),
})
const iconStyleStar = new Style({
  image: new Icon({
    anchor: [14, 32],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    src: pin_star,
  }),
})
const iconStyleShop = new Style({
  image: new Icon({
    anchor: [14, 32],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    src: pin_shop,
  }),
})

/**
 * Map Component
 */
const Map = ({
  markers, onMarkerClick, position, className, center, controls, displayLayerStar, displayLayerRepair, displayLayerShop,
}) => {
  const [vectorSource, setVectorSource] = useState()
  const [rentalVectorLayer, setRentalVectorLayer] = useState()
  const [repairVectorLayer, setRepairVectorLayer] = useState()
  const [storeVectorLayer, setStoreVectorLayer] = useState()
  const [map, setMap] = useState()
  const mapCenter = center || [-1.6777926, 48.117266]

  let mounted = true

  useEffect(() => {
    // Create open street map layer
    const source = new OlXYZ({
      url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    })

    const layer = new OlTileLayer({
      source,
    })

    const view = new OlView({
      center: fromLonLat(mapCenter),
      zoom: 16,
    })

    const vectorSource = new VectorSource(/* {
      features: [iconFeature]
    } */)

    const boxesLayer = new VectorLayer({
      source: vectorSource,
      style: iconStyleSelect,
    })

    // VeloStar rental point
    const rentalSource = new VectorSource({
      url: bicycle_rental,
      format: new GeoJSON(),
    })

    const rentalVectorLayer = new VectorLayer({
      source: rentalSource,
      style: iconStyleStar,
    })

    // rentalVectorLayer.setVisible(false)
    // Repair points
    const repairSource = new VectorSource({
      url: bicycle_repair_station,
      format: new GeoJSON(),
    })

    const repairVectorLayer = new VectorLayer({
      source: repairSource,
      style: iconStyleRepair,
    })

    // repairVectorLayer.setVisible(false)
    // Store points
    const storeSource = new VectorSource({
      url: store_bicycle,
      format: new GeoJSON(),
    })
    const storeVectorLayer = new VectorLayer({
      source: storeSource,
      style: iconStyleShop,
    })
    // storeVectorLayer.setVisible(false)

    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    })

    geolocation.setTracking(true)

    const accuracyFeature = new Feature()

    const positionFeature = new Feature({
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      }),
    })

    const positionLayer = new VectorLayer({
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    })

    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition()
      positionFeature.setGeometry(coordinates
        ? new Point(coordinates) : null)
    })
    geolocation.on('change:accuracyGeometry', () => {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
    })

    // Init map
    const map = new OlMap({
      target: 'map',
      layers: [layer, positionLayer, rentalVectorLayer, repairVectorLayer, storeVectorLayer, boxesLayer],
      view,
      controls: (controls === false) ? [] : undefined,
    })

    let first = true

    map.on('singleclick', event => {
      if (!onMarkerClick) {
        return
      }

      const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature)

      if (!feature) {
        return
      }

      const [lat, long] = transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326')
      const id = feature.get('id')

      if (!id) {
        return
      }

      onMarkerClick({
        id,
        lat,
        long,
      })
    })

    map.on('rendercomplete', () => {
      if (first) {
        first = false

        if (mounted) {
          setVectorSource(vectorSource)
          setRentalVectorLayer(rentalVectorLayer)
          setRepairVectorLayer(repairVectorLayer)
          setStoreVectorLayer(storeVectorLayer)
        }
      }
    })

    setMap(map)

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!vectorSource) {
      return
    }

    vectorSource.clear()

    markers.forEach(({ lat, long, id }) => {
      const iconFeature = new Feature({
        id,
        geometry: new Point(fromLonLat([long, lat])),
      })

      vectorSource.addFeature(iconFeature)
    })

    // iconFeature.setStyle(this.iconStyle)
  }, [markers, vectorSource])

  useEffect(() => {
    if (!rentalVectorLayer) {
      return
    }

    rentalVectorLayer.setVisible(displayLayerStar)
  }, [displayLayerStar, rentalVectorLayer])

  useEffect(() => {
    if (!repairVectorLayer) {
      return
    }

    repairVectorLayer.setVisible(displayLayerRepair)
  }, [displayLayerRepair, repairVectorLayer])

  useEffect(() => {
    if (!storeVectorLayer) {
      return
    }

    storeVectorLayer.setVisible(displayLayerShop)
  }, [displayLayerShop, storeVectorLayer])

  return (
    <React.Fragment>
      <div id="map" className={classnames('map', className)} />
      <div className="map_copyright">
        &copy
        {' '}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
        {' '}
        contributors,
        Tiles style by
        {' '}
        <a href="https://www.hotosm.org/" target="_blank" rel="noopener noreferrer">
          Humanitarian
          OpenStreetMap Team
        </a>
        hosted by
        {' '}
        <a href="https://openstreetmap.fr/" target="_blank" rel="noopener noreferrer">OpenStreetMap France</a>
      </div>
    </React.Fragment>
  )
}

Map.propTypes = {}

Map.defaultProps = {}

export { Map }
