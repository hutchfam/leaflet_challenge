// Create the tile layer that will be the background of our map
var dabombmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});


// Create the map with our layers
var map = L.map("mapid", {
  center: [40.73, -74.0059],
  zoom: 4
});

// Add our 'lightmap' tile layer to the map
dabombmap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",function(data){
    console.log(data.features)
    createFeatures(data.features);
})

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        console.log(feature.properties.place)
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); //arrays in data
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = 
    L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    }).addTo(map);
  
    // Sending our earthquakes layer to the createMap function
    // createMap(earthquakes);
  }
  
//   function createMap(earthquakes) {
  
    // // Define streetmap and darkmap layers
    // var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    //   tileSize: 512,
    //   maxZoom: 18,
    //   zoomOffset: -1,
    //   id: "mapbox/streets-v11",
    //   accessToken: API_KEY
    // });
  
    // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "dark-v10",
    //   accessToken: API_KEY
    // });
  
    // // Define a baseMaps object to hold our base layers
    // var baseMaps = {
    //   "Street Map": streetmap,
    //   "Dark Map": darkmap
    // };
  
    // Create overlay object to hold our overlay layer
    // var overlayMaps = {
    //   Earthquakes: earthquakes
    // };
  
    // // Create our map, giving it the streetmap and earthquakes layers to display on load
    // var myMap = L.map("map", {
    //   center: [
    //     37.09, -95.71
    //   ],
    //   zoom: 5,
    //   layers: [streetmap, earthquakes]
    // });
  
    // // Create a layer control
    // // Pass in our baseMaps and overlayMaps
    // // Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(myMap);
//   } remember me!!!
// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);