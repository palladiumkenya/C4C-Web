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
        lg4
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
        lg4
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
        lg4
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
      
      <template>
   <!-- Start filters -->

           <v-layout >
              <v-flex
               xs12
                  md6
                  lg3
                  >

            <template>

                 <v-combobox
          v-model="facility"
          item-text="county"
          item-value="id"
          :items="all_facilities"
          label="Select County"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

               <v-flex
               xs12
                  md6
                  lg3
                  >

            <template>

                 <v-combobox
          v-model="facility"
          item-text="sub_county"
          item-value="county"
          :items="all_facilities"
          label="Select Sub-County"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

              <v-flex
               xs12
                  md6
                  lg3
                  >

            <template>

                 <v-combobox
          v-model="facility"
          item-text="partner"
          item-value="sub_county"
          :items="all_facilities"
          label="Select Partner"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

              <v-flex
               xs12
                  md6
                  lg3
                  >

            <template>

                 <v-combobox
          v-model="facility"
          item-text="fecility_level"
          item-value="id"
          :items="all_facilities"
          label="Select Facility Level"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
            </v-flex>

           <v-flex
           xs12
             md6
            lg3
           >
            <template>
                 <v-combobox
          v-model="facility"
          item-text="name"
          item-value="id"
          :items="all_facilities"
          label="Select Facility"
          multiple
          clerable
          persistent-hint
          chips>
          </v-combobox>
                
            </template>
           </v-flex>
           </v-layout>
    

            <template>

              <input type="date" v-model="startDate">
              <input type="date" v-model="endDate">
            </template>

                <template>
                  <v-btn block color="secondary" dark>Filter</v-btn>
                </template>
               
            <!-- End filters -->
      </template>


      <!-- Start Graphs -->
  <v-flex
        sm3
        xs8
        md4
        lg12
      >
        <highcharts
          ref="barChart"
          :options="barOptionsTest"/>
      </v-flex>
      <!-- End Graphs -->
      <v-flex
        sm3
        xs8
        md4
        lg12
      >
        <highcharts
          ref="barChart"
          :options="barOptionsTime"/>
      </v-flex>
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

       facility: '',
      all_facilities: [],

     barOptionsTime: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Months Range'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No of Exposures',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
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
          text: 'Monthly Exposure Rate'

        },
        series: [
          {
            type: 'column',

            colorByPoint: true,
            name: 'No of Reported Exposures',
            data: []
          },

        ]
        
      },

      barOptionsTest: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Months Range'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No of Registration',
            align: 'high'
          },
          labels: {
            overflow: 'justify',
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
          text: 'Monthly Registration Trends '
        },
        series: [
          
           {
            type: 'column',
            colorByPoint: true,
            name: 'Registration in Numbers',
            data: []
          }
        ]
        
      },

      

      date: [],

      date: [],
      s: [],
      userz: [],
      usersl: [],
      u: 0,
      b: 0,
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
    if (this.user === null) {
      alert('Not admin')
      this.$router.replace({
        name: 'login'
      })
    }
    this.getExp()
    this.getUsers()
    this.getBroadcasts()
    this.getAllUsers()
    this.getFacilities()

  },
  methods: {

     getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
          this.all_counties = facilities.data.data
          if (facilities.data.links.next != null) {
            this.link = facilities.data, links.next
            this.loopT(this.link)
          }
        })
        .catch(error => console.log(error.message))
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

    getMonth () {

      var wdata = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        wdata.push(this.getNumt(this.barOptionsTime.xAxis.categories[i]))
      }
      this.barOptionsTime.series[0].data = wdata
    },
     getTest ()
    {
       var reg = []
      for (var r in this.barOptionsTest.xAxis.categories) {
        reg.push(this.getNumr(this.barOptionsTest.xAxis.categories[r]))
        
      }
     this.barOptionsTest.series[0].data = reg
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
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)

           this.userz = this.userz.concat(response.data.data)

        } else {
          i = 11
        }
      }

      this.getMonth()
      

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
     this.getTest()
      this.getRegistrations()
      this.getLocations()

    },

    getNumt (name) {
      var counter = 0
      for (var xt in this.s) {
        if (this.s[xt].exposure_date.slice(0, 3) === name) {
          console.log(name)
          counter++
        }
      }
      return counter
    },

    getNumr (name) {
      var counter = 0
      for (var r in this.userz) {
        var dat = new Date(this.userz[r].created_at)
        var list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        if (list[dat.getMonth()] === name) {
          console.log(name)
          counter++
        }
      }
      return counter
    },

    getNums (name) {
      var counter = 0
      for (var xo in this.userz) {
        if (moment(this.userz[xo].created_at).format().substr(5, 2) === name) {
          counter++
        }
      }
      return counter
    }

  }
}
</script>
