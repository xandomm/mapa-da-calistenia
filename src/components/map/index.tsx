import { useEffect, useRef } from 'react';

import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import {Feature, Map, View} from 'ol/index.js';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import {useGeographic} from 'ol/proj';

import styled from 'styled-components';
import 'ol/ol.css';

import { useGetPlaces } from '../../services/getMaps';

const MapBlock = () => {
    useGeographic();    
    const mapContainerRef = useRef(null);
    const { places, isLoading, isError }  = useGetPlaces();

    console.log(places);

    const mapPoints = !isLoading
    ? places.map((place) => {
        const point = new Point([Number(place.long), Number(place.lat)]);
        console.log([Number(place.long), Number(place.lat)]);
        return new Feature(point)
      })
    : [new Feature(new Point([-48.2772, -18.9146]))];
    console.log(mapPoints)
    useEffect(() => {
        const map = new Map({
            target: mapContainerRef.current,
            layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                source: new VectorSource({
                    features: mapPoints,
                }),
                style: {
                    'circle-radius': 9,
                    'circle-fill-color': 'red',
                },
                }),
            ],
            view: new View({
            center: [-48.2772, -18.9146],
            zoom: 12,
            }),
        });

        return () => {
            map.setTarget(null);
        };
    }, [isLoading]);
    if(isLoading) return <div>Loading...</div>
    return <Container ref={mapContainerRef} />;
}

    const Container = styled.div`
        width: 100%;
        height: 600px;
    `

    export default MapBlock;