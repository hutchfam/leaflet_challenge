var my_awesome_map = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
function markerSize(mag) {
    return mag * 30000
}

function getColor(d) {
    return d >= 90 ? 'Crimson':
           d >= 70 ? 'coral':
           d >= 50 ? 'orange':
           d >= 30 ? 'yellow':
           d >= 10 ? 'chartreuse':
                     'green';
}
d3.json(my_awesome_map, function (data) {
  createFeatures(data.features);
});
function createFeatures(earth_quake_data) {
    var earth_quakes = L.geoJSON(earth_quake_data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h3> Magnitude (Strength): ' + feature.properties.mag + 
            '<br> Location: ' + feature.properties.place + 
            '</h3><hr><p><b> Date/Time: ' + new Date(feature.properties.time) + '<br>' + 'Depth: ' + feature.geometry.coordinates[2] + '</b></p>')
        },
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
                {
                    radius: markerSize(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]),
                    fillOpacity: .25,
                    weight: 0.5
                })
        }
    });
    createMap(earth_quakes);
}

function createMap(earthquakes) {
    var jedi = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        tileSize: 500,
        zoomOffset: -1,
        id: "light-v10",
        accessToken: API_KEY
    });
    var the_dark_side = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        tileSize: 500,
        zoomOffset: -1,
        id: "dark-v10",
        accessToken: API_KEY
    });
    var map_for_light_and_dark = {
        'Light Map': jedi,
        'Going Dark': the_dark_side,
    };
    var map_for_overlay = {
        'All the Shakies': earthquakes
    };
    
    var myMap = L.map("mapid", {
      //center: [26, 127], for okinawa
      //center: [27, 85],  for kathmandu
      //center: [36, 71], for ashkasham
      //center: [37, -117], for San Diego
      //center: [38, -85], for Louisville
      center: [37, -117],
        zoom: 4,
        layers: [jedi, earthquakes]
    });

    L.control.layers(map_for_light_and_dark, map_for_overlay, {
        collapsed: false
    }).addTo(myMap);

    var my_legend = L.control({ position: 'bottomright' });
    my_legend.onAdd = function () {
        var div_legend = L.DomUtil.create('div', 'info legend');
        var earth_depth = [-10, 10, 30, 50, 70, 90];
        var h3 = '<h3> Depth of <br> Earthquakes </h3><hr>'
            div_legend.innerHTML = h3;
        for (var i = 0; i < earth_depth.length; i++) {
            div_legend.innerHTML +=
                '<i style="background:' + getColor(earth_depth[i] + 1) + 
                '"></i> ' + earth_depth[i] + (earth_depth[i + 1] ? ' - ' + 
                earth_depth[i + 1] + '<br>' : ' + ');
        };
        return div_legend;
    };
    my_legend.addTo(myMap);
}