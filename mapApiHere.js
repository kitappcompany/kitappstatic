var platform, maptypes, map, mapEvents, ui;
function initmap() {
      document.getElementById('gmap_canvas').innerHTML = "";
      // Initialize the platform object:
      platform = new H.service.Platform({
        'apikey': 'lgd-e15FDEkLYQ9aUvUhnt-fTcCvwjONTXDaOxys5-U'
      });

      // Obtain the default map types from the platform object
      maptypes = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      map = new H.Map(
        document.getElementById('gmap_canvas'),
        maptypes.vector.normal.map,
        {
          zoom: 10,
          center: { lng:  49.98176, lat: 40.44414 }
        });

      // Enable the event system on the map instance:
      mapEvents = new H.mapevents.MapEvents(map);

      // Instantiate the default behavior, providing the mapEvents object:
      var behavior = new H.mapevents.Behavior(mapEvents);


      // Create the default UI:
      ui = H.ui.UI.createDefault(map, maptypes, "tr-TR");
    }
function maps_HERE(all_locations_obj){

      for (let j = 0; j < all_locations_obj.length; j++) {
        let lnglat = JSON.parse(all_locations_obj[j]["displayLocation"]);
        position = {
            lat: lnglat["Latitude"],
            lng: lnglat["Longitude"]
          }

        let marker = new H.map.Marker(position);
        map.addObject(marker);
      }

    }
