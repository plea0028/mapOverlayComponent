import { useRef, useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useMapStore } from "../store/useMapStore";
import mockFriendlyUnits from '../data/mockFriendlyUnits';
import mockTopography from '../data/mockTopography';
import mockAiInsights from '../data/mockAiInsights';

export const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map>(null);
    const store = useMapStore();

    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        maplibregl.setWorkerUrl(workerUrl);

        const map = new maplibregl.Map({
            container: mapContainerRef.current!,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [-75.69, 45.42],
            zoom: 10,
        });

        map.on('load', () => {
            setIsMapLoaded(true);

            map.addSource('topography', {
                type: 'geojson',
                data: mockTopography,
            });

            map.addSource('aiInsights', {
                type: 'geojson',
                data: mockAiInsights,
            });

            map.addSource('friendlyUnits', {
                type: 'geojson',
                data: mockFriendlyUnits,
            });

            map.addLayer({
                id: 'topography',
                type: 'line',
                source: 'topography',
                paint: {
                    'line-color': '#312443',
                    'line-width': 5,
                    'line-opacity': 0.5,
                }
            });

            map.addLayer({
                id: 'aiInsights',
                type: 'fill',
                source: 'aiInsights',
                paint: {
                    'fill-color': '#ff0000',
                    'fill-opacity': 0.5,
                }
            });

            map.addLayer({
                id: 'friendlyUnits',
                type: 'circle',
                source: 'friendlyUnits',
                paint: {
                    'circle-radius': 16,
                    'circle-color': '#00ff00',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',
                }
            });

            map.on('click', 'topography', (e) => {
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<h3>${e.features![0].properties.elevation}</h3>`)
                    .addTo(map);
            });

            map.on('click', 'aiInsights', (e) => {
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<h3>${e.features![0].properties.region}, ${e.features![0].properties.threatLevel}</h3>`)
                    .addTo(map);
            });

            map.on('click', 'friendlyUnits', (e) => {
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<h3>${e.features![0].properties.name}</h3>`)
                    .addTo(map);
            });
        });

        mapRef.current = map;
        
        return () => map.remove();
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
        if (!isMapLoaded) return;

        mapRef.current?.setLayoutProperty('topography', 'visibility', store.topography? 'visible' : 'none');
        mapRef.current?.setLayoutProperty('friendlyUnits', 'visibility', store.friendlyUnits? 'visible' : 'none');
        mapRef.current?.setLayoutProperty('aiInsights', 'visibility', store.aiInsights? 'visible' : 'none');

    }, [isMapLoaded, store.aiInsights, store.friendlyUnits, store.topography]);

    return (
        <div ref={mapContainerRef} className="map-container">
        </div>
    );
};