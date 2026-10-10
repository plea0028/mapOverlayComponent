const mockAiInsights = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [-76.15, 44.95],
                    [-75.95, 44.95],
                    [-75.95, 45.15],
                    [-76.15, 45.15],
                    [-76.15, 44.95] // Polygons must close where they started!
                ]]
            },
            properties: { threatLevel: 'high', region: 'Sector 7' }
        }
    ]
};

export default mockAiInsights;