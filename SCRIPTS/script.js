'use strict';

require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Legend",
    "esri/rest/support/Query"
], function (Map,SceneView, FeatureLayer, GraphicsLayer, Legend, Query) {

    const map = new Map({
        basemap: "topo-vector",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "map3d", 
        map: map,
        zoom: 4,
        center: [-103.7715 ,44.9672]
    });

    // Warstwy

    let gl = new GraphicsLayer();
    let g2 = new GraphicsLayer();

    const f1 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    });

    const f2 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    });

    map.add(f2)
    map.add(gl);
    map.add(g2);

    // Widgety

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, {position: "bottom-right"});
    
    let query = f1.createQuery();

    query.where = "MAGNITUDE > 4";
    query.outFields = ['*'];
    query.returnGeometry = true;

    f1.queryFeatures(query)
    .then(response => {
        console.log(response);
        getResults(response.features);
    })
    .catch(err => {
        console.log(err);
    });

    const getResults = (features) => {
        let symbol = {
            type: "simple-marker",
            size: 15,
            color: "red",
            style: "triangle"
        };
        
        features.map(elem => {
            elem.symbol = symbol;
        });

        gl.addMany(features)
    };

    // Rendering

    const simple = {
        type: "simple",
        symbol: {
            type: "point-3d",
            symbolLayers: [
                {
                    type: "object",
                    resource: {
                        primitive: "cylinder"
                    },
                    width:5000
                },
            ]
        },
        label: "Earthquake",
        visualVariables: [
            {
                type: "color",
                field: "MAGNITUDE",
                stops: [
                    {
                        value: 0.5,
                        color: "green"
                    },
                    {
                        value: 4,
                        color: "red"
                    },
                ]
            },
            {
                type: "size",
                field: "DEPTH",
                stops: [
                    {
                        value: -3.39,
                        size: 5000
                    },
                    {
                        value: 30.97,
                        size: 13000
                    },
                ]
            }
        ]
    };

    f2.renderer = simple;


});
