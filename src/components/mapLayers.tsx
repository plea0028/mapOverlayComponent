import { useMapStore } from "../store/useMapStore";

const availableLayers = [
    { label: 'Topography', key: 'topography' },
    { label: 'Friendly Units', key: 'friendlyUnits' },
    { label: 'Ai Insights', key: 'aiInsights' },
] as const;

export const MapLayers = () => {
    const store = useMapStore();

    return (
        <div className="map-layers-container">
            <div className="map-layers-header">
                <h3 className="map-layers-title">Map Layers</h3>
                <button className="clear-button" onClick={store.clearAllLayers}>Clear All Layers</button>
            </div>
            <p className="map-layers-description">Select the layers you want to display on the map:</p>
            {availableLayers.map(({ label, key }) => (
                <label key={key} className="map-layer-label">
                    {label}
                <input
                        type="checkbox"
                        checked={store[key]}
                        onChange={() => store.toggleLayers(key)}
                    />
                </label>
            ))}
        </div>
    );
};