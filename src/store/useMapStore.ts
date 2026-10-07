import { create } from 'zustand';

// export const useMapStore = create((set) => ({
//     state: "default",
//     hasText: false,
//     text: "",
// }));

type LayerName = 'topography' | 'friendlyUnits' | 'aiInsights';

type MapState = {
    topography: boolean;
    friendlyUnits: boolean;
    aiInsights: boolean;
    toggleLayers: (layerName: LayerName) => void;
    clearAllLayers: () => void;
}

export const useMapStore = create<MapState>((set) => ({
    topography: false,
    friendlyUnits: false,
    aiInsights: false,

    toggleLayers: (layerName: LayerName) => set((state) => ({
        [layerName]: !state[layerName]
    })),

    clearAllLayers: () => set({
        topography: false,
        friendlyUnits: false,
        aiInsights: false,
    })
}));