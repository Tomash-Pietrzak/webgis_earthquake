'use strict';

require([
    "esri/config",
    "esri/Map",
    "dijit/form/Button",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
], function (esriConfig, Map, Button,SceneView, FeatureLayer) {

    esriConfig.apiKey = "AAPKb3392f1605744b938328349d8bbcc26aYzDBpljmCG_A187wY3SjiBZyWhphttQP1yLgvIjXQAabtCHZh-Pmpg1DTRnq4eQ6"

    const map = new Map({
        basemap: "topo-vector",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "map3d", 
        map: map,
        zoom: 4
    });


    const fl = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    });

    // Widgety
    

});

