    mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fsdmx1IiwiYSI6ImNraDVrdno0MzBtcXEycW92dGtqbmRzOGMifQ.DcBDLkgaiyFIsaEr_389Xw';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/calvlu/ckm0jta9h3az217ovunmyuqjp',
      center: [-3.632, 0.339],
      zoom: 4.3,
      scrollZoom: false,
      dragPan: false
    });

    var months = [
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November'
    ];

    function filterBy(month) {
      var filters = ['==', 'month', month + 4];
      map.setFilter('covid-fill', filters);

      // Set the label to the month
      document.getElementById('month').textContent = months[month];
    }

    map.on('load', function() {
      map.addSource('covidalbers', {
        type: 'vector',
        url: 'mapbox://calvlu.92zvja9c'
      });
      map.addLayer({
        'id': 'covid-fill',
        'type': 'fill',
        'source': 'covidalbers',
        'source-layer': 'covidalbers',
        'paint': {
          'fill-color': [
            'match', ['get', 'color'],
            'b', '#6BA0C7',
            'r', '#CE575E',
            "#CCC"
          ],
          'fill-opacity': 0.9,
          'fill-outline-color': '#fff'
        }
      }, 'state-boundaries');



      // Set filter to first month of the year
      // 0 = January
      filterBy(0);

      document
        .getElementById('slider')
        .addEventListener('input', function(e) {
          var month = parseInt(e.target.value, 10);
          filterBy(month);
        });
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mousemove', 'covid-fill', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var description = `<h3>${e.features[0].properties.state}</h3>
          <p>Cases / 100k: ${Math.round(e.features[0].properties.case_rate*100)/100}</p>`;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
      });

      map.on('mouseleave', 'covid-fill', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });