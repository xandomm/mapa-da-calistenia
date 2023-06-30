import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { block } from 'million/react';
import styled from 'styled-components';


const MapBlock = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-48.2772, -18.9146]), // Centered on Uberlândia
        zoom: 6,
      }),
    });

    // Uberlândia marker
    const uberlandiaMarker = new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    const uberlandiaLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(fromLonLat([-48.2772, -18.9146])), // Uberlândia coordinates
          }),
        ],
      }),
      style: uberlandiaMarker,
    });

    map.addLayer(uberlandiaLayer);

    // Brasília marker
    const brasiliaMarker = new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    const brasiliaLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(fromLonLat([-47.8825, -15.7939])), // Brasília coordinates
          }),
        ],
      }),
      style: brasiliaMarker,
    });

    map.addLayer(brasiliaLayer);

    return () => {
      map.setTarget(null);
    };
  }, []);

    return <Container ref={mapContainerRef} />;
    }

    const Container = styled.div`
        width: 100%;
        height: 400px;
    `

    export default MapBlock;