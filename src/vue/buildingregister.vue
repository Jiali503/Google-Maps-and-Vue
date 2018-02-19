<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="map-header">
      <div class="filters">
        <h2>Search and Filters</h2>
        <search @selection="searchSelection($event)"></search>
        <div class="field">
          <label for="rating-type">Rating Type</label>
          <select id="rating-type" v-model="filterRating" @change="updateFilter()">
            <option value="">Select a rating type</option>
            <option v-for="rating in filterRatings" :key="rating">{{ rating }}</option>
          </select>
        </div>
        <div class="field">
          <label for="building-type">Building Type</label>
          <select id="building-type" v-model="filterBuilding" @change="updateFilter()">
            <option value="">Select a building type</option>
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </div>
      </div>
    </div>
    <div class="map-body">
      <div class="map-body-map">
        <gmap
          :mapoptions="mapoptions"
          :mapmarkers="mapmarkers"
          :mappolygons="mappolygons"
          @markerclick="markerClick($event)"
        ></gmap>
        <div v-if="visibleDetails" class="marker-details">
          <button @click="visibleDetails = null">Close</button>
          <div class="details">
            {{ visibleDetails.desc }}
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
          <li v-for="item in mapmarkers" :key="item.id">
            <button @click="listItemClick(item)">{{ item.title }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./src/vue/buildingregister.js"></script>
