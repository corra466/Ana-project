// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var mymapcontainer = L.map('sp-map', {
  center: [-23.65, -46.6],
  zoom: 10  
});

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(mymapcontainer);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'corra466'
});

// LAYER 1 (POINTS) ----------------------->

// Initialze source data
var pointsSource = new carto.source.SQL('SELECT * FROM corra466.shapefile_points_2');

// Create style for the data
var pointsStyle = new carto.style.CartoCSS(`
  #layer {
  marker-width: 8;
  marker-fill: ramp([type], (#0b0b0b, #cc1073, #cc1073, #c169ff, #13c9f2, #5ff604, #5336cc, #737373), ("PUMP", "SR", "SR_Share", "SR_ALTOTIETE", "ETA", "SR_GUARAPIRANGA", "SR_SLOURENCO", "PUMP_DIST"), "=");
  marker-fill-opacity: 1;
  marker-file: ramp([type], (url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/triangle-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/production/corra466/assets/20191206195656Share.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/water-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/triangle-stroked-18.svg')), ("PUMP", "SR_Share", "ETA", "PUMP_DIST"), "=");
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #fafafa;
  marker-line-opacity: 1;
  
[zoom>=11] {
  [type = 'SR'] {
    marker-width: 13;
    marker-line-color: #000000;
	}
    
  [type = 'ETA'] {
    marker-width: 20;
    }
    
  [type = 'SR_Share'] {
    marker-width: 13;
    marker-line-color: #000000;
  	}
   

}
}
`);

// Add style to the data
var pointsLayer = new carto.layer.Layer(pointsSource, pointsStyle);


// LAYER 2 (PIPES) ----------------------->

// Initialze source data
var pipeSource = new carto.source.SQL('SELECT * FROM corra466.shapefile_lines_2');

// Create style for the data
var pipeStyle = new carto.style.CartoCSS(`
  #layer {
  line-width: 1.5;
  line-color: #000000;
  line-opacity: 0.35;
  }
`);

// Add style to the data
var pipeLayer = new carto.layer.Layer(pipeSource, pipeStyle);


// ADD ALL LAYERS TO MAP ----------------------->

// Add the data to the map as a layer
client.addLayer(pointsLayer); // add 1st layer
client.addLayer(pipeLayer); // add 2nd layer
client.getLeafletLayer().addTo(mymapcontainer);