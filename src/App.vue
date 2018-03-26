<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="map-header">
      <div class="filters">
        <h2>Search and Filters</h2>
        <search @selection="searchSelection($event)"></search>
        <div class="field">
          <label for="building-type">Building type</label>
          <select id="building-type" v-model="filterBuildingType" @change="updateFilter()">
            <option value="">Select a building type</option>
            <option v-for="opt in allBuildingTypes" :key="opt.value" :value="opt.value">
              {{ opt.label}}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="rating-scope">Rating scope</label>
          <select id="rating-scope" v-model="filterRatingScope" @change="updateFilter()">
            <option value="">Select a rating scope</option>
            <option v-for="opt in allRatingScopes" :key="opt.value" :value="opt.value">
              {{ opt.label}}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="rating-type">Rating type</label>
          <select id="rating-type" v-model="filterRatingType" @change="updateFilter()">
            <option value="">Select a rating type</option>
            <option v-for="opt in allRatingTypes" :key="opt.value" :value="opt.value">
              {{ opt.label}}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="star-rating-from">Star rating (from)</label>
          <input id="star-rating-from" type="number" v-model="filterStarRatingFrom" @change="updateFilter()">
        </div>
        <div class="field">
          <label for="star-rating-to">Star rating (to)</label>
          <input id="star-rating-to" type="number" v-model="filterStarRatingTo" @change="updateFilter()">
        </div>
      </div>
    </div>
    <div class="map-body">
      <div class="map-body-map">
        <gmap
          :mapoptions="mapoptions"
          :mapmarkers="filteredmarkers"
          :mappolygons="mappolygons"
          @markerclick="markerClick($event)"
        ></gmap>
        <div v-if="visibleDetails" class="marker-details">
          <button @click="visibleDetails = null">Close</button>
          <div class="details">
            {{ visibleDetails.desc }}
            <ul>
              <li v-for="(item, index) in visibleDetails.ratings" :key="index" class="rating-item">
                <span><strong>Star Rating:</strong> {{ item.starRating }}</span>
                <span><strong>Building Type:</strong> {{ item.buildingType }}</span>
                <span><strong>Rating Scope:</strong> {{ item.ratingScope }}</span>
                <span><strong>Rating Type:</strong> {{ item.ratingType }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="map-body-listing">
        <div class="controls">
          <h2>Controls</h2>
          <button @click="addMarker()">Add Marker</button>
          <button @click="removeAllMarkers()">Remove All Markers</button>
          <button @click="addPolygon()">Add Polygon</button>
          <button @click="removeAllPolygons()">Remove All Polygons</button>
          <button @click="bulkAddMarkers()">Add X Markers</button>
          <input type="text" v-model="xmarkers" />
        </div>
        <h2>Markers</h2>
        <ul>
          <li v-for="item in filteredmarkers" :key="item.id">
            <button @click="listItemClick(item)">{{ item.title }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Gmap from './components/Gmap'
import SearchField from './components/SearchField'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    gmap: Gmap,
    search: SearchField
  },
  data: function() {
    return {
      allBuildingTypes: [
        { value: 'office', label: 'Office'},
        { value: 'hotel', label: 'Hotel'},
        { value: 'shoppingcentre', label: 'Shopping Centre'},
        { value: 'datacentre', label: 'Data Centre'},
        { value: 'apartments', label: 'Apartments'}
      ],
      allRatingScopes: [
        { value: 'basebuilding', label: 'Base building'},
        { value: 'wholebuilding', label: 'Whole building'},
        { value: 'tenancy', label: 'Tenancy'},
        { value: 'infrastructure', label: 'Infrastructure'},
        { value: 'wholefacility', label: 'Whole facility'},
        { value: 'itequipment', label: 'IT equipment'},
      ],
      allRatingTypes: [
        { value: 'office', label: 'Office'},
        { value: 'hotel', label: 'Hotel'},
        { value: 'shoppingcentre', label: 'Shopping Centre'},
        { value: 'datacentre', label: 'Data Centre'},
        { value: 'apartments', label: 'Apartments'}
      ],
      xmarkers: 10,
      filterBuildingType: '',
      filterRatingScope: '',
      filterRatingType: '',
      filterStarRatingFrom: 0,
      filterStarRatingTo: 0,
      title: "",
      searchselection: "",
      mapoptions: {
        zoom: 8,
        center: { lat: -32, lng: 149 },
        scaleControl: true
      },
      mapmarkers: [],
      mappolygons: [],
      visibleDetails: null
    }
  },
  methods: {
    addMarker: function() {
      console.log('Add Marker');
      var newRatings = [];
      var r = Math.floor(Math.random() * 5);
      for (var i = 0; i < r; i++) {
        newRatings.push({
          starRating: (Math.random() * 6).toFixed(2),
          buildingType: this.allBuildingTypes[Math.floor(Math.random() * this.allBuildingTypes.length)].value,
          ratingScope: this.allRatingScopes[Math.floor(Math.random() * this.allRatingScopes.length)].value,
          ratingType: this.allRatingTypes[Math.floor(Math.random() * this.allRatingTypes.length)].value
        });
      }
      var randomid = Math.floor(Math.random() * 100);
      this.mapmarkers.push({
        id: this.mapmarkers.length,
        title: "New Rating " + randomid,
        latLng: { lat: -31 + (Math.random() * 10), lng: 120 + (Math.random() * 25) },
        desc: "New Description for marker " + randomid,
        ratings: newRatings
      });
    },
    removeAllMarkers: function() {
      console.log("Remove markers");
      this.mapmarkers = [];
    },
    bulkAddMarkers: function() {
      this.removeAllPolygons();
      for (var i = 0; i < this.xmarkers; i++) {
        this.addMarker();
      }
    },
    addPolygon: function() {
      console.log('Add Polygon');
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
    searchSelection: function(e) {
      console.log(e);
    },
    markerClick: function(event) {
      this.showDetails(event.item);
    },
    listItemClick: function(item) {
      this.showDetails(item);
    },
    updateFilter: function() {
      this.setQueryVariables({
        buildingtype: this.filterBuildingType,
        ratingscope: this.filterRatingScope,
        ratingtype: this.filterRatingType,
        starratingfrom: this.filterStarRatingFrom,
        starratingto: this.filterStarRatingTo
      });
    },
    setFilterFromURL: function() {
      var q = this.getQueryVariables();
      this.filterBuildingType = q['buildingtype'] || '';
      this.filterRatingScope = q['ratingscope'] || '';
      this.filterRatingType = q['ratingtype'] || '';
      this.filterStarRatingFrom = q['starratingfrom'] || '';
      this.filterStarRatingTo = q['starratingto'] || '';
    },
    getQueryVariables: function() {
      var o = {};
      var q = window.location.search.substring(1);
      if (q.length > 0) {
        var vars = q.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          o[decodeURI(pair[0])] = decodeURI(pair[1]);
        }
      }
      return o;
    },
    setQueryVariables: function(query_object) {
      var qs = '?';
      for (var key in query_object) {
        if (query_object[key].length > 0) {
          if (qs.length > 1) {
            qs += '&';
          }
          qs += encodeURI(key) + '=' + encodeURI(query_object[key]);
        }
      }
      history.pushState(query_object, '', qs);
    },
    showDetails: function(marker) {
      this.visibleDetails = marker;
      this.mapoptions = {
        zoom: 10,
        center: {
          lat: marker.latLng.lat,
          lng: marker.latLng.lng
        }
      };
    }
  },
  mounted: function() {
    var self = this;

    this.setFilterFromURL();

    // Settings.
    axios.get('./static/appdata.json')
      .then(function(response) {
        self.title = decodeURI(response.data.title);
      });

    // Markers.
    axios.get('./static/markerdata.json')
      .then(function(response){
        self.mapmarkers = response.data.markers;
      });

    window.onpopstate = this.setFilterFromURL;
  },
  computed: {
    filteredmarkers: function () {
      var _self = this;
      console.log(_self.filterStarRatingFrom, _self.filterStarRatingTo);
      if (
        _self.filterBuildingType == '' &&
        _self.filterRatingScope =='' &&
        _self.filterRatingType =='' &&
        _self.filterStarRatingFrom == ('' || 0) &&
        _self.filterStarRatingTo == ('' || 0)
      ) {
        // Nothing selected. Return all.
        return this.mapmarkers;
      }
      else {
        // Perform filter.
        return this.mapmarkers.filter(function(item) {
          var show = false;
          item.ratings.forEach(function(rating) {
            // Filter by building type.
            if (rating.buildingType === _self.filterBuildingType) {
              show = true;
            }
            // Filter by rating scope.
            if (rating.ratingScope === _self.filterRatingScope) {
              show = true;
            }
            // Filter by rating type.
            if (rating.ratingType === _self.filterRatingType) {
              show = true;
            }
            // Filter by star rating.
            var sr = parseFloat(rating.starRating);
            var fr = parseFloat(_self.filterStarRatingFrom);
            var to = parseFloat(_self.filterStarRatingTo);
            if (sr >= fr && sr <= to) {
              show = true;
            }
          });
          return show;
        });
      }
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');

  $open_sans: 'Open Sans', sans-serif;

  $column-width: 1200px;

  $key-color: #565294;
  $key-color-2: #3DDC97;

  $button-disabled-grey: #E6E6E6;
  $blue: #4A90E2;
  $light-grey: #F6F7F8;

  $button-color: $key-color-2;

  $green: #27AE60;
  $yellow: #F1C40F;
  $blue: #3498DB;

  @mixin breakpoint($class) {
    @if $class==desktop {
      @media (min-width: 1200px) {
        @content;
      }
    }
    @else if $class==large_tablet {
      @media (min-width: 1024px) {
        @content;
      }
    }
    @else if $class==tablet {
      @media (min-width: 768px) {
        @content;
      }
    }
    @else if $class==mobile {
      @media (max-width: 420px) {
        @content;
      }
    }
    @else {
      @warn "Breakpoint mixin supports: desktop, large_tablet, tablet, mobile";
    }
  }

  @mixin button {
    cursor: pointer;
    font-family: $open_sans;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 17px;
    color: white;
    border: 0;
    border-radius: 0;
    background-color: $button-color;
  }

  @mixin button_small {
    @include button;
    min-width: 60px;
    height: 24px;
    padding: 2px 7px;
    font-size: 13px;
    background-color: $key-color;
  }

  @mixin button_small_disabled {
    @include button_small;
    color: #4A4A4A;
    font-weight: 400;
    background-color: $button-disabled-grey;
  }

  @mixin tab {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 700;
    &.active {
      border-bottom: 4px solid $key-color;
    }
  }

  body, button {
    font-family: $open_sans;
  }

  $map-height: 768px;

  #map {
    width: 100%;
    height: $map-height;
  }

  .map-body {
    display: flex;
    .map-body-map {
      width: 100%;
      margin-right: 20px;
      position: relative;
    }
    .map-body-listing {
      width: 300px;
      max-height: $map-height;
      overflow-y: scroll;
    }
  }

  .ui-autocomplete {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 500px;
  }

  .marker-details {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: lightgrey;
    width: 300px;
    overflow-y: scroll;
  }

  .rating-item {
    border-bottom: 1px solid grey;
    margin-bottom: 22px;
    span {
      display: block;
    }
  }
</style>
