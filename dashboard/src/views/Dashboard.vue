<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>

      <!-- Start Cards -->
      <v-flex
        sm6
        xs12
        md6
        lg3
      >

        <template>
          <v-card
            class="mx-auto"
            color="#2196f3"
            dark
          >

            <v-card-text>

              <h2 align="center">{{ HCWsCount }}</h2>
              <h5 align="center">Registered HCWs</h5>
            </v-card-text>
            <v-icon
              left
            />
          </v-card>
        </template>

      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >

        <template>
          <v-card
            class="mx-auto"
            color="#2196f3"
            dark
          >

            <v-card-text>

              <h2 align="center">{{ facilityCount }}</h2>
              <h5 align="center">Reported Exposures</h5>
            </v-card-text>
            <v-icon
              left
            />
          </v-card>
        </template>

      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >

        <template>
          <v-card
            class="mx-auto"
            color="#2196f3"
            dark
          >

            <v-card-text>

              <h2 align="center">{{ exposuresCount }}</h2>
              <h5 align="center">HCWs With Exposures</h5>
            </v-card-text>
            <v-icon
              left
            />
          </v-card>
        </template>

      </v-flex>

      <v-flex
        sm6
        xs12
        md6
        lg3
      >

        <template>
          <v-card
            class="mx-auto"
            color="#2196f3"
            dark
          >

            <v-card-text>

              <h2 align="center">{{ resultCount }}</h2>
              <h5 align="center">Broadcast Messages</h5>
            </v-card-text>
            <v-icon
              left
            />
          </v-card>
        </template>

      </v-flex>

      <!-- End Cards -->

      <!-- Filters -->

      <!-- Start Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >
        <!-- insert some chart here -->
        <div id="appy">
          exposures Id's as string  {{ getLocations }}
          {{ getLocationsNumber}}
        </div>
        <h3 v-text="message"></h3>
      </v-flex>

      <!-- End Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >
        <!-- insert some chart here -->
        <highcharts :options="chartOptions"></highcharts>
      </v-flex>

      <v-flex
        md12
        sm12
        lg12
      >
        <!-- insert some chart here -->

      </v-flex>

      <!-- Start Maps -->

      <!-- Start Tables -->

    </v-layout>
  </v-container>
</template>

<script>
import {Chart} from 'highcharts-vue'
import axios from 'axios'
export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {
    getLocations:[],
      getLocationsNumber:[],
    message: 'Fetching Data...',
    chartOptions: {
      chart: {
        height: 300,
        type: 'column'
       },
       title: {
         text: 'Amount of visitors per day'
        },
        series: [{
          name: [],
          colorByPoint: true,
          data: []
        }
        ]
      },
      facility_exposures: {},
      hcw_exposures: {},
      registered_hcw: {},
      broadcastCount: {},
     }
  },

  mounted: function () {
    this.getdata()

    setTimeout(function(){
        this.message = 'Data Fetched';
        this.chartOptions.series[0].name = this.getLocations
        this.chartOptions.series[0].data = this.getLocationsNumber
   //   this.chartOptions.xAxis.categories = this.getLocations
    }.bind(this), 3000);

    axios.get('users')
      .then(exp => {
        // console.log(exp.data.data);
        this.registered_hcw = exp.data.data // <--- Im thinking this is an object
      })


    // number of broadcasts
    axios.get('broadcasts/web/all')
      .then(response => {
        this.broadcastCount = response.data.data // <--- Im thinking this is an object
      })

    // hcw with exposures # mounted

    axios.get('immunizations/all')
      .then(response => {
        this.hcw_exposures = response.data.data // <--- Im thinking this is an object
      })
  },
  methods: {
    async getdata () {
      let resp = await  axios.get('exposures/all')
      var i, x;
      console.log(resp.data.data)
      for (i = 0; i < resp.data.data.length; i++) {
        this.getLocationsNumber.push(resp.data.data.length);
        this.getLocations.push(resp.data.data[i].type);
       // x += resp.data.data[i].type + "";
      }
      this.facility_exposures = resp.data.data
      return  this.getLocationsNumber
      return this.getLocations
    }
  },
  computed: {
    resultCount () {
      return Object.keys(this.broadcastCount).length
    },

    // all facility exposures # computed

    facilityCount () {
      return Object.keys(this.facility_exposures).length
    },

    // hcws with exposures # computed

    exposuresCount () {
      return Object.keys(this.hcw_exposures).length
    },
    HCWsCount () {
      return Object.keys(this.registered_hcw).length
    }
  },
}
</script>
