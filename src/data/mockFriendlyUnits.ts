const mockFriendlyUnits = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-76.0, 45.0] },
            properties: { name: 'Unit Alpha' }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-76.1, 45.1] },
            properties: { name: 'Unit Bravo' }
        }
    ]
};

export default mockFriendlyUnits;