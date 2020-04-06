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
      <v-card>
     <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab>Report By Verification</v-tab>
        <v-tab-item
        v-for="n in 7"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
 <v-flex
        md12
        sm12
        lg12
      >{{location}}{{usersl}}
        <!-- insert some chart here -->
        <highcharts
          ref="barChart"
          :options="chartOptions"/>
      </v-flex>

      <v-flex
        md12
        sm12
        lg12
      >{{month}}
        <!-- insert some chart here -->
         <highcharts
          ref="columnChart"
          :options="RegistrationsChartOptions"/>
      </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">
          </v-card-text>
          <v-card-text v-if="n==3">
          </v-card-text>
          <v-card-text v-if="n==4">
          </v-card-text>
          <v-card-text v-if="n==5">
          </v-card-text>
          <v-card-text v-if="n==6">
          </v-card-text>
          <v-card-text v-if="n==7">
          </v-card-text>
        </v-container>
        </v-tab-item>


     </v-tabs>

</v-card>
      <!-- End Graphs -->


      <!-- Start Maps -->

      <!-- Start Tables -->

    </v-layout>
  </v-container>
</template>

<script>
import { Chart } from 'highcharts-vue'
import axios from 'axios'
import Highcharts from "highcharts";
import moment from "moment";
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {


      RegistrationsChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
    text: 'registrations by Month'
  },
        subtitle: {
        //  text: 'by Type'
        },
  xAxis: {
    //
     categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
   // categories:  ['Prick', 'Cut', 'Spill', 'fluid spill', 'Bite', 'Needle stick injury', 'Human Bite', 'Needle prick', 'Splash on mucosa', 'Non-intsact skin', 'Other', 'Etc', 'Not Specified']

  },
  labels: {
    items: [
      {
        html: '',
        style: {
          left: '50px',
          top: '18px',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
        }
      }
    ]
  },
  series: [

    {
      //type: 'column',
      colorByPoint: true,
      name: ['Registrations'],
      data: []
    }

  ]
      },


      chartOptions: {
        xAxis: {
          categories: ['Lab', 'Ward', 'Theatre', 'Pharmacy', 'Corridors', 'Medical ward', 'Emergency Room', 'Surgical ward', 'Maternity', 'Dental clinic', 'Laundry', 'OP/MCH', 'Other', 'Not Specified'],
          title: {
            text: 'Location of Exposure'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
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
      userz: [],
      usersl: [],
      u: 0,
      b: 0,
      month: [],
      location: [],
      seriesnames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      seriesnamel: ['MALE', 'FEMALE','Mombasa', 'Kakamega', 'Nairobi', 'Kajiado', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga', 'Murang\'a', 'Kiambu', 'Turkana', 'West Pokot', 'Samburu'],
      scount: 0
    }
  },
  computed: {
    broadcastsCount () {
      return this.b
    },

    // all facility exposures # computed

    usersCount () {
      return this.u
    },

    // hcws with exposures # computed

    exposuresCount () {
      return this.scount
    }
  },

  created () {
    this.getExp()
    this.getUsers()
    this.getBroadcasts()
    this.getAllUsers()


    // hcw with exposures # mounted

    axios.get('immunizations/all')
      .then(response => {
        this.hcw_exposures = response.data.data // <--- Im thinking this is an object
      })
  },
  methods: {
    getDep () {
      var count = 0
      for (var i in this.chartOptions.series) {
        this.seriesdata = []
        for (var v in this.chartOptions.xAxis.categories) {
          this.seriesdata.push(this.getNum(this.chartOptions.xAxis.categories[v], this.chartOptions.series[i].name[0]))
          count += this.getNum(this.chartOptions.xAxis.categories[v], this.chartOptions.series[i].name[0])
        }
        this.chartOptions.series[i].data = this.seriesdata
      }
    },
    getExp () {
      axios.get('exposures/all/')
        .then((exp) => {
          this.scount = exp.data.meta.total
          this.s = exp.data.data
          this.link = exp.data.links.next
          this.loopT(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getUsers () {
      axios.get('users')
        .then((users) => {
          this.u = users.data.meta.total
        })
        .catch(error => console.log(error.message))
    },
     getAllUsers() {
      axios.get('users')
      .then((exp) => {
        this.userz = exp.data.data
        this.userl = exp.data.data
        console.log(exp.data.data[5].hcw.facility.county)
        this.link = exp.data.links.next
        this.loopT(this.link)
      })
      .catch(error => console.log(error.message))
    },
    getBroadcasts () {
      axios.get('broadcasts/web/all')
        .then((users) => {
          //console.log(users.data.meta.total)
          this.b = users.data.meta.total
        })
        .catch(error => console.log(error.message))
    },

      getRegistrations(){
      var counter = 0;
      for(var va in this.seriesnames){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnames[va])
        this.seriesdata.push(this.getNums(this.seriesnames[va]))
        counter += this.getNums(this.seriesnames[va])
        this.month.push(this.seriesdata)
      }
      this.RegistrationsChartOptions.series[0].data = this.month
    },
    getLocations(){
      var counter = 0;
      for(var va in this.seriesnamel){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnamel[va])
        this.seriesdata.push(this.getNuml(this.seriesnamel[va]))
        counter += this.getNuml(this.seriesnamel[va])
        this.location.push(this.seriesdata)
        console.log(this.seriesdata)
      }
      //this.LocationsChartOptions.series[0].data = this.location
    },

    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
          this.userz = this.userz.concat(response.data.data)
        //  this.userl = this.userl.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.getDep()
      this.getRegistrations()
      this.getLocations()
    },
    getNum (loc, type) {
      var count = 0
      for (var x in this.s) {
        // console.log(this.s[x].type)
        if (this.s[x].location === loc && this.s[x].type === type) {
          //console.log(this.s[x].type)
          //refs / remotes / origin / develop
          count++
        }
      }
      return count
    },
    getNums(name){
      var counter = 0
      for(var xo in this.userz){
        if (moment(this.userz[xo].created_at).format().substr(5,2) === name){
          counter++
        }
      }
      return counter
    },
    getNuml(name){
      var counter = 0
      for(var xo in this.userl){
        if (this.userz[xo].gender === name){
          counter++
        console.log(this.userl[xo])}
      }
      return counter
    }
  }
}
</script>
