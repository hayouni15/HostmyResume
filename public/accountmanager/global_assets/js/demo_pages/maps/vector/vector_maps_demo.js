/* ------------------------------------------------------------------------------
 *
 *  # Vector maps
 *
 *  Specific JS code additions for maps_vector.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------
var  marker=[];
var VectorMaps = function() {


    //
    // Setup module components
    //

    // Line chart
    var _vectorMapsExamples = function() {
        if (!$().vectorMap) {
            console.warn('Warning - jvectormap.min.js is not loaded.');
            return;
        }
        marker=[
            {latLng: [53.93,-116.57], name: 'Alberta'},
            {latLng: [53.93,-60.57], name: 'Alberta'},
            {latLng: [53.93,-100.57], name: 'Alberta'},
            {latLng: [64, -135], name: 'Yukon'}
        ]
        cityAreaData = [
            887.70,
           500.70,
           200.70,
            325.42
        ]
        var count=0;
    $.post('/carbuddy/mycodes/fixbuddyphpcontroller.php', JSON.stringify(['GET_city'])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
        plotmarkers(marker);
    }).done(function(data) {
        data.forEach(function(element) {
        //  console.dir(element);
           marker[count]={latLng: [element.latitude,element.longitude], name: element.city}
           cityAreaData[count]=50;
            count++;
        });
         plotmarkers(marker);
    });
    
        // Regions selection
     
        // Set data
    
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _vectorMapsExamples();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    VectorMaps.init();
});

var plotmarkers = function(marker)
{
  //  console.log('City querry done');
        markers = marker,
        cityAreaData = [
            887.70,
           500.70,
           200.70,
            325.42
        ]

        // Configuration
        var map = new jvm.WorldMap({
            container: $('.map-regions'),
            map: 'ca_lcc',
            backgroundColor: 'transparent',
            regionsSelectable: true,
            markersSelectable: true,
            markers: markers,
            markerStyle: {
                initial: {
                    'fill': '#E77644',
                    'stroke': '#fff',
                    'stroke-width' : 1.5,
                    'stroke-opacity': 0.9
                },
                hover: {
                    'stroke': '#fff',
                    'fill-opacity': 1,
                    'stroke-width': 1.5
                },
                selected: {
                    'fill': '#CA0020'
                }
            },
            regionStyle: {
                initial: {
                    "stroke-width": 1.5,
                    'stroke': '#fff',
                    'fill': '#93D389'
                },
                selected: {
                    'fill': '#00a2ca'
                }
            },
            series: {
                markers: [{
                    attribute: 'r',
                    scale: [5, 15],
                    values: cityAreaData
                }]
            },
            onRegionSelected: function(){
                if (window.localStorage) {
                    window.localStorage.setItem(
                        'jvectormap-selected-regions',
                        JSON.stringify(map.getSelectedRegions())
                    );
                }
            },
            onMarkerSelected: function(){
               // alert(markers[0].name);
                if (window.localStorage) {
                    window.localStorage.setItem(
                        'jvectormap-selected-markers',
                        JSON.stringify(map.getSelectedMarkers())
                    );
                }
            }
        });


  

   
 

        // Set regions
        map.setSelectedRegions( JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ) );
        map.setSelectedMarkers( JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]' ) );  
}
 

