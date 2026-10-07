import { useMapStore } from "../store/useMapStore";

type LayerName = 'topography' | 'friendlyUnits' | 'aiInsights';
const availableLayers: LayerName[] = ['topography', 'friendlyUnits', 'aiInsights'];

export const MapLayers = () => {
    const store = useMapStore();

    return (
        <div className="map-layers-container">
            <h3 className="map-layers-title">Map Layers</h3>
            <button className="clear-layers-button" onClick={store.clearAllLayers}>Clear All Layers</button>
            <p className="map-layers-description">Select the layers you want to display on the map:</p>
            {availableLayers.map((layerName) => (
                <label key={layerName} className="map-layer-label">
                    {layerName}
                <input
                        type="checkbox"
                        checked={store[layerName]}
                        onChange={() => store.toggleLayers(layerName)}
                    />
                </label>
            ))}
        </div>
    );
};