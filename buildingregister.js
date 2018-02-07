// ================================================================
// MAP MODULE
// ================================================================
const gmapComponent = {
  template: `<div id="map"></div>`,
  data: function() {
    return {
      markerCluster: null,
      markers: [],
      polygons: [],
      map: {}
    }
  },
  methods: {
    initMap() {
      console.log("Initialize map");
      this.map = new google.maps.Map(document.getElementById('map'), this.mapoptions);
      this.addMarkers();
      this.addPolygons();
    },
    markerClick: function(marker) {
      this.$emit('markerclick', marker);
    },
    addMarkers() {
      console.log("add markers");
      var self = this;
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // Clear markers.
      if (this.markerCluster != null) {
        this.markerCluster.clearMarkers();
      }

      // Generate markers.
      this.markers = this.mapmarkers.map(function(item, i) {
        var marker = new google.maps.Marker({
          position: item.latLng,
          label: labels[i % labels.length],
          item: item,
          index: i
        });
        marker.addListener('click', function() {
          self.markerClick(marker);
        });
        return marker;
      });

      // Add to cluster.
      this.markerCluster = new MarkerClusterer(this.map, this.markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    },
    addPolygons() {
      console.log("Add Polygons");
      var self = this;

      // Clear polygons.
      self.polygons.forEach(function(item, i) {
        item.setMap(null);
      });

      // Add polygons.
      this.polygons = this.mappolygons.map(function(poly, i) {
        var newPoly = new google.maps.Polygon(self.getPolygonFill(poly.coords));
        newPoly.setMap(self.map);
        return newPoly;
      });
    },
    getPolygonFill: function(coords) {
      return {
        paths: coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      };
    }
  },
  mounted() {
    this.initMap();
  },
  props: ['mapoptions', 'mapmarkers', 'mappolygons'],
  watch: {
    mapoptions: function (newVal, oldVal) {
      console.log("Map Data Set");
      console.log(newVal);
    },
    mapmarkers: function (newVal, oldVal) {
      console.log("Map Markers Set");
      this.addMarkers();
    },
    mappolygons: function (newVal, oldVal) {
      console.log("Map Polygons Set");
      console.log(newVal);
      this.addPolygons();
    }
  }
};

// ================================================================
// MAIN MODULE
// ================================================================
module.exports = {
  components: {
    gmap: gmapComponent
  },
  data: function() {
    return {
      title: "",
      searchinput: "",
      mapoptions: {
        zoom: 8,
        center: { lat: -32, lng: 149 },
        scaleControl: true
      },
      mapmarkers: [],
      mappolygons: []
    }
  },
  methods: {
    addMarker: function() {
      console.log("Add Marker");
      this.mapmarkers.push({
        id: this.mapmarkers.length,
        title: "New Rating " + Math.floor(Math.random() * 100),
        latLng: { lat: -33 + (Math.random() * 2), lng: 149 + (Math.random() * 2) },
        desc: "New Desc"
      });
    },
    removeAllMarkers: function() {
      console.log("Remove markers");
      this.mapmarkers = [];
    },
    addPolygon: function() {
      console.log("Add Polygon");
      this.mappolygons.push({
        coords: [
          { lat: -33 + (Math.random() * 2), lng: 149 + (Math.random() * 2) },
          { lat: -33 + (Math.random() * 2), lng: 149 + (Math.random() * 2) },
          { lat: -33 + (Math.random() * 2), lng: 149 + (Math.random() * 2) }
        ]
      });
    },
    removeAllPolygons: function() {
      this.mappolygons = [];
    },
    filterResults: function() {
      console.log(this.searchinput);
    },
    markerClick: function(event) {
      alert(event.item.desc);
    },
    listItemClick: function(item) {
      console.log("Clicked", item.title);
    }
  },
  mounted: function() {
    // Load data.
    var self = this;
    jQuery.ajax({
      url: 'http://echo.jsontest.com/title/Building%20Register',
      success: function(dataJSON) {
        self.title = decodeURI(dataJSON.title);
      }
    });
  }
};