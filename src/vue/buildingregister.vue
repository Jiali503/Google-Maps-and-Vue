<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="filters">
      <input type="text" v-model="searchinput" @change="filterResults()" placeholder="Enter search terms">
    </div>
    <gmap
      :mapoptions="mapoptions"
      :mapmarkers="mapmarkers"
      :mappolygons="mappolygons"
      @markerclick="markerClick($event)"
    ></gmap>
    <div class="controls">
      <button @click="addMarker()">Add Marker</button>
      <button @click="removeAllMarkers()">Remove All Markers</button>
      <button @click="addPolygon()">Add Polygon</button>
      <button @click="removeAllPolygons()">Remove All Polygons</button>
    </div>
    <ul>
      <li v-for="item in mapmarkers" :key="item.id">
        <button @click="listItemClick(item)">{{ item.title }}</button>
      </li>
    </ul>
  </div>
</template>

<script src="./src/vue/buildingregister.js"></script>
