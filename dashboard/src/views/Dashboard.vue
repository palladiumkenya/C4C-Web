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
        <h3 v-text="message"/>
      </v-flex>

      <!-- End Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >
        <!-- insert some chart here -->
        <highcharts :options="chartOptions" ref="barChart"/>
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
import { Chart } from 'highcharts-vue'
import axios from 'axios'
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
    chartOptions: {
      xAxis: {
        categories:['Lab','Ward','Theatre','Pharmacy','Corridors','Medical ward','Emergency Room','Surgical ward','Maternity','Dental clinic','Laboratory','Laundry','OP/MCH','Other','Not Specified'],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "No. of Exposures",
          align: "high"
        },
        labels: {
          overflow: "justify"
        }
      },
      chart: {
        height: 700,
        type: 'column'
       },
       title: {
         text: 'Number of exposures'
        },
        series: [{
          name: ['Prick'],
          data: []
        },
        {
          name: ['Spill'],
          data: []
        },
        {
          name: ['Bite'],
          data: []
        },
        {
          name: ['Cut'],
          data: []
        },
        {
          name: ['fluid spill'],
          data: []
        },
        {
          name: ['Human Bite'],
          data: []
        },
        {
          name: ['Needle prick'],
          data: []
        },
        {
          name: ['Needle stick injury'],
          data: []
        },
        {
          name: ['Non-intact skin'],
          data: []
        },
        {
          name: ['Not Specified'],
          data: []
        },
        {
          name: ['Other'],
          data: []
        },
        {
          name: ['Splash on mucosa'],
          data: []
        },
        {
          name: ['Etc'],
          data: []
        }
        ]
      },
      seriesdata: [],
      s: [],
      facility_exposures: {},
      hcw_exposures: {},
      registered_hcw: {},
      broadcastCount: {}
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
    },
    datas () {
      return this.getLocations
    }
  },

  mounted: function () {
    this.getExp()

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
    getDep(){
      var count = 0;
      for(var i in this.chartOptions.series){
        this.seriesdata = []
        for(var v in this.chartOptions.xAxis.categories){
          this.seriesdata.push(this.getNum(this.chartOptions.xAxis.categories[v], this.chartOptions.series[i].name[0]))
          count += this.getNum(this.chartOptions.xAxis.categories[v], this.chartOptions.series[i].name[0])

        }
        this.chartOptions.series[i].data = this.seriesdata
        console.log(this.seriesdata)
      }

      console.log(count)
    },
    getExp () {
      axios.get('exposures/all/')
      .then((exp) => {
        this.s = exp.data.data
        this.link = exp.data.links.next
        this.loopT(this.link)
      })
      .catch(error => console.log(error.message))
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.getDep()
    },
    getNum(loc, type){
      var count = 0
      for(var x in this.s){
        //console.log(this.s[x].type)
        if (this.s[x].location === loc && this.s[x].type === type){
          console.log(this.s[x].type)
          count++
        }
      }
      return count
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
  }
}
</script>
