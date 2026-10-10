const mockTopography = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [-76.2, 44.9],
                    [-76.0, 45.0],
                    [-75.8, 45.2]
                ]
            },
            properties: { elevation: '150m' }
        }
    ]
};

export default mockTopography;