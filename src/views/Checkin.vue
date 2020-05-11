<template>
  <div class="map">
    <l-map
      :center="[0.559, 38.2]"
      :zoom="6"
      :options="mapOptions"
      style="height: 500px;">
      <l-choropleth-layer
        :data="pyDepartmentsData"
        :value="value"
        :extra-values="extraValues"
        :geojson="paraguayGeojson"
        :color-scale="colorScale"
        title-key="department_name"
        id-key="department_id"
        geojson-id-key="dpto">
        <template slot-scope="props">
          <l-info-control
            :item="props.currentItem"
            :unit="props.unit"
            class="map"
            title="County"
            placeholder="Hover over a County"/>
          <l-reference-chart
            :color-scale="colorScale"
            :min="props.min"
            :max="props.max"
            title="Users enrolment"
            position="topright"/>
        </template>
      </l-choropleth-layer>
    </l-map>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import * as geojson from '../vendor/data'
import paraguayGeojson from '../vendor/counties.json'
import { pyDepartmentsData } from '../vendor/para_dep'
import { LMap } from 'vue2-leaflet'
export default {
  components: {
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer
  },
  data () {
    return {
      pyDepartmentsData,
      paraguayGeojson,
      colorScale: geojson.colorArray,
      value: {
        key: 'users',
        metric: 'users'
      },
      extraValues: [{
        key: 'exposures',
        metric: 'exposures'
      }],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: 'e7d090'
    }
  }
}
</script>
<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
body {
  background-color: #e7d090;
  margin-left: 100px;
  margin-right: 100px;
}
.map {
  background-color: #e7d090;
}
</style>
