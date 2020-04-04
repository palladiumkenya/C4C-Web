<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>

      <!-- Start Cards -->
      <v-flex
        sm3
        xs8
        md4
        lg2
      >

        <template>
          <v-card
            class="mx-auto"
            color="#4B9FD2"
            dark
          >

            <v-card-text>
<v-icon class="mr-1" >mdi-account-group</v-icon>
              <h2 align="center">{{ usersCount }}</h2>
              <h5 align="center">Registered Health Care Workers</h5>
            </v-card-text>
          </v-card>
        </template>

      </v-flex>

      <v-flex
        sm3
        xs8
        md4
        lg2
      >

        <template>
          <v-card
            class="mx-auto"
            color="#4B9FD2"
            dark
          >

            <v-card-text>
<v-icon class="mr-1">mdi-file-chart</v-icon>
              <h2 align="center">{{ exposuresCount }}</h2>
              <h5 align="center">Reported Exposures</h5>
            </v-card-text>
          </v-card>
        </template>

      </v-flex>

      <v-flex
        sm3
        xs8
        md4
        lg2
      >

        <template>
          <v-card
            class="mx-auto"
            color="#4B9FD2"
            dark
          >

            <v-card-text>
<v-icon class="mr-1">mdi-message</v-icon>
              <h2 align="center">{{ broadcastsCount }}</h2>
              <h5 align="center">Broadcast Messages Sent</h5>
            </v-card-text>
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
        categories:['Lab','Ward','Theatre','Pharmacy','Corridors','Medical ward','Emergency Room','Surgical ward','Maternity','Dental clinic','Laundry','OP/MCH','Other','Not Specified'],
        title: {
          text: 'Location of Exposure'
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
      u: [],
      b: []
    }
  },

  mounted: function () {
    this.getExp();
            this.getUsers();
            this.getBroadcasts();

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
      }

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
    getUsers () {
      axios.get('users')
      .then((users) => {
        this.u = users.data.data
        this.link = users.data.links.next
        this.loopU(this.link)
      })
      .catch(error => console.log(error.message))
    },
     getBroadcasts () {
      axios.get('broadcasts/web/all')
      .then((users) => {
        this.b = users.data.data
        this.link = users.data.links.next
        this.loopB(this.link)
      })
      .catch(error => console.log(error.message))
    },
    async loopB (lo) {
      var i
      for (i = 0; i < 1;) {
        if (lo != null) {
          let response = await axios.get(lo)
          lo = response.data.links.next
          this.b = this.b.concat(response.data.data)
        } else {
          i = 11
        }
      }
    },
    async loopU (li) {
      var i
      for (i = 0; i < 1;) {
        if (li != null) {
          let response = await axios.get(li)
          li = response.data.links.next
          this.u = this.u.concat(response.data.data)
        } else {
          i = 11
        }
      }
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

 refs/remotes/origin/develop
          count++
        }
      }
      return count
    }
  },
  computed: {
    broadcastsCount () {
      return Object.keys(this.b).length
    },

    // all facility exposures # computed

    usersCount () {
      return Object.keys(this.u).length
    },

    // hcws with exposures # computed

    exposuresCount () {
      return Object.keys(this.s).length
    }
  }
}
</script>
