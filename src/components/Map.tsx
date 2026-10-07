import { useRef, useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useMapStore } from "../store/useMapStore";
import mockFriendlyUnits from '../data/mockFriendlyUnits';

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

            // map.addSource('topography', {
                
            // });

            map.addSource('friendlyUnits', {
                type: 'geojson',
                data: mockFriendlyUnits,
            });

            map.addLayer({
                id: 'friendlyUnits',
                type: 'circle',
                source: 'friendlyUnits',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#0055ff',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',
                }
            });

            // map.addSource('aiInsights', {
                
            // });
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