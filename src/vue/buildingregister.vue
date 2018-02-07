<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="map-header">
      <div class="filters">
        <h2>Search and Filters</h2>
        <input type="text" v-model="searchinput" @change="filterResults()" placeholder="Enter search terms">
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
      </div>
      <div class="map-body-listing">
        <div class="controls">
          <h2>Controls</h2>
          <button @click="addMarker()">Add Marker</button>
          <button @click="removeAllMarkers()">Remove All Markers</button>
          <button @click="addPolygon()">Add Polygon</button>
          <button @click="removeAllPolygons()">Remove All Polygons</button>
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
