import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';

const MapComponent = () => {
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
          center: [0, 0],
          zoom: 2,
        }),
      });
  
      return () => {
        map.setTarget(null);
      };
    }, []);
  
    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>;
  };
  
  export default MapComponent;