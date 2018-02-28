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

<script src="./src/vue/buildingregister.js"></script>
