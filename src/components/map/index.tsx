import { useEffect, useRef } from 'react';

import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import {Feature, Map, View} from 'ol/index.js';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import {useGeographic} from 'ol/proj';

import styled from 'styled-components';
import 'ol/ol.css';

const MapBlock = () => {
    useGeographic();

    const mapContainerRef = useRef(null);
    const places = [[-48.2772, -18.9146],[-47.8825, -15.7939]]
    const point = new Point(places[0])

    useEffect(() => {
        const map = new Map({
            target: mapContainerRef.current,
            layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                source: new VectorSource({
                    features: [new Feature(point)],
                }),
                style: {
                    'circle-radius': 9,
                    'circle-fill-color': 'red',
                },
                }),
            ],
            view: new View({
            center: fromLonLat([-48.2772, -18.9146]),
            zoom: 6,
            }),
        });

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