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
      <v-tab>Report By Profile</v-tab>
        <v-tab-item
        v-for="n in 7"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
        <v-flex
        md12
        sm12
        lg12

      >{{exposure_location}}

        <!-- insert some chart here -->
        <highcharts
          ref="barChart"
          :options="chartOptions"/>
      </v-flex>

      <v-flex
        md12
        sm12
        lg12
      >
        <!-- insert some chart here -->
      </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">
              <highcharts
          ref="columnChart"
          :options="LocationsChartOptions"/>
          </v-card-text>
          <v-card-text v-if="n==3">
               <highcharts
          ref="columnChart"
          :options="CadreChartOptions"/>
          </v-card-text>
          <v-card-text v-if="n==4">
              <highcharts
          ref="lineChart"
          :options="RegistrationsChartOptions"/>
          </v-card-text>
          <v-card-text v-if="n==5">
              <highcharts
          ref="columnChart"
          :options="AgeChartOptions"/>
          </v-card-text>
          <v-card-text v-if="n==6">
               <highcharts
          ref="pieChart"
          :options="GenderChartOptions"/>
          </v-card-text>
          <v-card-text v-if="n==7">{{profile}}
              <highcharts
          ref="columnChart"
          :options="ProfileChartOptions"/>
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
import Highcharts from 'highcharts'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
        AgeChartOptions: {
        xAxis: {
          categories: ['0 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
          title: {
            text: 'Age Groups'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Registration by Age'
        },
        series: [
          {
            name: 'Numbers',
            data: []
          }
        ]
      },


        ProfileChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Profiles completed'
        },
        subtitle: {
        //  text: 'by Type'
        },
  xAxis: {
    //
    // categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
     categories: ['Incomplete', 'Complete'],

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
            // type: 'column',
            colorByPoint: true,
            name: ['Registrations'],
            data: []
          }

        ]
      },

        CadreChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'registrations by Cadre'
        },
        subtitle: {
        //  text: 'by Type'
        },
  xAxis: {
    //
    // categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
     categories: ['Nurse', 'Clinical officer', 'Doctor', 'Lab Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor',
        'Other-Specify'],

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
            // type: 'column',
            colorByPoint: true,
            name: ['Registrations'],
            data: []
          }

        ]
      },


        LocationsChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'registrations by Location'
        },
        subtitle: {
        //  text: 'by Type'
        },
  xAxis: {
    //
    // categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
     categories: ['Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir',
         'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga',
         'Murang\'a', 'Kiambu', 'Turkana', 'West Pokot', 'Samburu', 'Trans-Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'Nandi', 'Baringo',
         'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay',
         'Migori', 'Kisii', 'Nyamira', 'Nairobi' ]


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
            // type: 'column',
            colorByPoint: true,
            name: ['Registrations'],
            data: []
          }

        ]
      },


         GenderChartOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures By Location in Facility'
        },
        subtitle: {
        //  text: 'by location'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: 'Exposures Count',
            data: []
          },
        ]
      },



      RegistrationsChartOptions: {
        chart: {
          type: 'line',
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
    // categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
     categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
            // type: 'column',
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
      gender: [],

      exposure_location: [],
        exposure_type: [],

      location: [],
      cadre: [],
      profile: [],
      age: [],

      seriesnames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      seriesnamel: ['Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir',
         'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga',
         'Murang\'a', 'Kiambu', 'Turkana', 'West Pokot', 'Samburu', 'Trans-Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'Nandi', 'Baringo',
         'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay',
         'Migori', 'Kisii', 'Nyamira', 'Nairobi' ],
      seriesnameg: ['MALE', 'FEMALE'],
        seriesnamec: ['Nurse', 'Clinical officer', 'Doctor', 'Lab Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor',
        'Other-Specify'],
        seriesnamea: ['0 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
        seriesnamep: [ 0, 1],
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
    },
    ...mapGetters({
      user: 'auth/user'
    })
  },
  
  created () {
    if (this.user === null){
      alert("Not admin")
      this.$router.replace({
        name: 'login'
      })
    }
    this.getExp()
    this.getUsers()
    this.getBroadcasts()
    this.getAllUsers()
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
            console.log(exp.data.data)
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
    getAllUsers () {
      axios.get('users')
      .then((exp) => {
        this.userz = exp.data.data
        console.log(exp.data.data)
        this.link = exp.data.links.next
        this.loopG(this.link)
      })
      .catch(error => console.log(error.message))
    },
    getBroadcasts () {
      axios.get('broadcasts/web/all')
        .then((users) => {
          // console.log(users.data.meta.total)
          this.b = users.data.meta.total
        })
        .catch(error => console.log(error.message))
    },

    getRegistrations () {
      var counter = 0
      for (var va in this.seriesnames) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesnames[va])
        this.seriesdata.push(this.getNums(this.seriesnames[va]))
        counter += this.getNums(this.seriesnames[va])
        this.month.push(this.seriesdata)
      }
      this.RegistrationsChartOptions.series[0].data = this.month
    },
    getLocations () {
      var counter = 0
      for (var va in this.seriesnamel) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesnamel[va])
        this.seriesdata.push(this.getNuml(this.seriesnamel[va]))
        counter += this.getNuml(this.seriesnamel[va])
        this.exposure_location.push(this.seriesdata)
      }
       this.LocationsChartOptions.series[0].data = this.location
    },
      getGender(){
      var counter = 0;
      for(var va in this.seriesnameg){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnameg[va])
        this.seriesdata.push(this.getNumg(this.seriesnameg[va]))
        counter += this.getNumg(this.seriesnameg[va])
        this.gender.push(this.seriesdata)
      }
      this.GenderChartOptions.series[0].data = this.gender
    },
      getCadre(){
      var counter = 0;
      for(var va in this.seriesnamec){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnamec[va])
        this.seriesdata.push(this.getNumc(this.seriesnamec[va]))
        counter += this.getNumc(this.seriesnamec[va])
        this.cadre.push(this.seriesdata)
      }
      this.CadreChartOptions.series[0].data = this.cadre
    },
      getAges(){
      var counter = 0;
      for(var va in this.seriesnamea){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnamea[va])
        this.seriesdata.push(this.getNuma(this.seriesnamea[va]))
        counter += this.getNuma(this.seriesnamea[va])
        this.age.push(this.seriesdata)
      }
      this.AgeChartOptions.series[0].data = this.age
    },
       getProfile(){
      var counter = 0;
      for(var va in this.seriesnamep){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnamep[va])
        this.seriesdata.push(this.getNump(this.seriesnamep[va]))
        counter += this.getNump(this.seriesnamep[va])
        this.profile.push(this.seriesdata)
      }
      this.ProfileChartOptions.series[0].data = this.profile
    },

    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
         // this.userz = this.userz.concat(response.data.data)
        //  this.userl = this.userl.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.getDep()


    },
       async loopG (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.userz = this.userz.concat(response.data.data)
        //  this.userl = this.userl.concat(response.data.data)
        } else {
          i = 11
        }
      }
  this.getRegistrations()
      this.getLocations()
      this.getGender()
           this.getCadre()
           this.getAges()
           this.getProfile()
    },
    getNum (loc, type) {
      var count = 0
      for (var x in this.s) {
        // console.log(this.s[x].type)
        if (this.s[x].exposure_location === loc && this.s[x].exposure_type === type) {
          // console.log(this.s[x].type)
          // refs / remotes / origin / develop
          count++
        }
      }
      return count
    },
    getNums (name) {
      var counter = 0
      for (var xo in this.userz) {
        if (moment(this.userz[xo].created_at).format().substr(5, 2) === name) {
          counter++
        }
      }
      return counter
    },
    getNuml (name) {
      var counter = 0
      for(var xo in this.userz){
        if (this.userz[xo].county === name){
          counter++
       }
      }
      return counter
    },
    getNumg(name){
      var counter = 0
      for(var xo in this.userz){
        if (this.userz[xo].gender === name){
          counter++
        }
      }
      return counter
    },
    getNumc(name){
      var counter = 0
      for(var xo in this.userz){
        if (this.userz[xo].cadre === name){
          counter++
        }
      }
      return counter
    },
    getNuma(name){
      var counter = 0
      for(var xo in this.userz){
        if (this.userz[xo].dob === name){
          counter++
        }
      }
      return counter
    },
    getNump(name){
      var counter = 0
      for(var xo in this.userz){
        if (this.userz[xo].profile_complete === name){
            console.log(this.userz[xo].profile_complete)
          counter++
        }
      }
      return counter
    }
  }
}
</script>
