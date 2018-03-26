<template>
  <div id="map"></div>
</template>

<script>
export default {
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
      console.log('+> Initialize map');
      this.map = new google.maps.Map(document.getElementById('map'), this.mapoptions);
      this.addMarkers();
      this.addPolygons();
    },
    markerClick: function(marker) {
      this.$emit('markerclick', marker);
    },
    addMarkers() {
      console.log('add markers');
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
      console.log('Add Polygons');
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
      console.log('Map Data Set');
      this.map.setZoom(newVal.zoom);
      this.map.setCenter(newVal.center);
      google.maps.event.trigger(this.map, 'resize');
    },
    mapmarkers: function (newVal, oldVal) {
      console.log('Map Markers Set');
      this.addMarkers();
    },
    mappolygons: function (newVal, oldVal) {
      console.log('Map Polygons Set');
      console.log(newVal);
      this.addPolygons();
    }
  }
}
</script>
