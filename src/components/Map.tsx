import { useRef, useEffect } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useMapStore } from "../store/useMapStore";

export const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map>(null);
    const store = useMapStore();

    useEffect(() => {
        maplibregl.setWorkerUrl(workerUrl);

        const map = new maplibregl.Map({
            container: mapContainerRef.current!,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [-75.69, 45.42],
            zoom: 10,
        });

        mapRef.current = map;

        return () => map.remove();
    }, []);

    useEffect(() => {
        
        if (!mapRef.current) return;

    }, [store.aiInsights, store.friendlyUnits, store.topography]);

    return (
        <div ref={mapContainerRef} className="map-container">
        </div>
    );
};