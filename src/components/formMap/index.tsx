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
interface Props {
    lat: number;
    long: number;

}
const FormMap = ({lat, long}: Props) => {
    useGeographic();    
    const mapContainerRef = useRef(null);    
    console.log(lat, long)

    useEffect(() => {
        const map = new Map({
            target: mapContainerRef.current,
            layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                source: new VectorSource({
                    features: [new Feature(new Point([long, lat]))],
                }),
                style: {
                    'circle-radius': 9,
                    'circle-fill-color': 'red',
                },
                }),
            ],
            view: new View({
            center: [long, lat],
            zoom: 15,
            }),
        });

        return () => {
            map.setTarget(null);
        };
    }, [lat, long]);
   
    return <Container ref={mapContainerRef} />;
}

    const Container = styled.div`
        width: 100%;
        height: 600px;
    `

    export default FormMap;