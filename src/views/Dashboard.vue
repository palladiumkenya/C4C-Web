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
                v-model="counties"
                :items="all_counties"
                item-text="name"
                item-value="id"
                label="Select County"
                v-on:change="getSubCounties"
                multiple
                clerable
                persistent-hint
                chips/>
            </template>
            <!-- {{ getSubCounties(counties) }} -->
          </v-flex>
          <v-flex
            xs12
            md6
            lg3
          >
            <template>
              <v-combobox
                v-model="subcounties"
                :items="all_subcounties"
                item-text="name"
                item-value="id"
                label="Select Sub-County"
                :disabled="active"
                multiple
                clerable
                persistent-hint
                chips/>

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
                :items="fac"
                item-text="partner"
                item-value="id"
                label="Select Partner"
                multiple
                clerable
                disabled
                persistent-hint
                chips/>

            </template>
          </v-flex>

          <v-flex
            xs12
            md6
            lg3
          >

            <template>

              <v-combobox
                :items="all_facilities_level"
                label="Select Facility Level"
                multiple
                clerable
                persistent-hint
                chips/>

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
                :items="fac"
                item-text="name"
                item-value="id"
                label="Select Facility"
                multiple
                clerable
                persistent-hint
                chips/>

            </template>
          </v-flex>
        </v-layout>

        <template>

          <input
            v-model="startDate"
            type="date">
          <input
            v-model="endDate"
            type="date">
        </template>

        <template>
          <v-btn
            block
            color="secondary"
            dark
            @click="click">Filter</v-btn>
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

import { EventBus } from './../event-bus.js'

export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      startDate: '',
      endDate: '',
      facility: '',
      counties: '',
      subcounties: '',
      fac: [],
      all_facilities: [],
      all_facilities_level: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5 and Above'],
      all_counties: [],
      all_subcounties: [],
      active: true,
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
          }

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
    usersCount () {
      return this.u
    },
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
    // EventBus.on("btn-clicked", data => {
    // this.barOptionsTime.series[0].data = data.newData;
    // });
    this.getExp()
    this.getBroadcasts()
    this.getAllUsers()
    this.getFacilities()
    this.getCounties()
    // this.getSubCounties()

    this.filterCounty()
    this.filterSubCounty()
  },
  methods: {

    click () {
    //  EventBus.emit("btn-clicked", {
    //    newData: [100, 12800, 500]
    //  });
    },
    filterSubCounty () {
      document.getElementById('selectSubCounty').addEventListener('change', function () {
        barOptionsTime.xAxis[0].setExtremes(Number(this.value), barOptionsTime.xAxis[0].max)
      })
    },

    filterCounty () {
      document.getElementById('selectCounty').addEventListener('change', function () {
        barOptionsTime.xAxis[0].setExtremes(Number(this.value), barOptionsTime.xAxis[0].max)
      })
    },
    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },
    getCounties () {
      axios.get('counties')
        .then((counties) => {
          console.log(counties.data.data)
          this.all_counties = counties.data.data
        })
        .catch(error => console.log(error.message))
    },

    getSubCounties (a) {
      // console.log(a)
      if (a) {
        this.active = false
        this.all_subcounties = []
        for (var i in a) {
          axios.get(`subcounties/${a[i].id}`)
            .then((subcounties) => {
              // console.log(subcounties.data)
              this.all_subcounties = this.all_subcounties.concat(subcounties.data.data)
            })
            .catch(error => console.log(error.message))
        }
        this.facilityCounty(a)
      }
    },
    facilityCounty (a) {
      let b = [], e = []

      console.log(a)
      if (a.length > 0) {
        for (var c in a) {
          // console.log(a[c].name)
          for (var f in this.all_facilities) {
            if (this.all_facilities[f].county == a[c].name) {
              b.push(this.all_facilities[f])
            }
          }
          for (var ex in this.s) {
            if (this.s[ex].county == a[c].name) {
              e.push(this.s[ex])
              console.log(this.s[ex])
            }
          }
        }
        this.getMonth(e)
        this.fac = b.sort()
      } else {
        this.fac = this.all_facilities
      }
    },

    getExp () {
      if (this.user.role_id === 1) {
        axios.get('exposures/all/')
          .then((exp) => {
            this.scount = exp.data.meta.total
            this.s = exp.data.data
            this.link = exp.data.links.next
            this.loopT(this.link)
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`exposures/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.scount = exp.data.meta.total
            this.s = exp.data.data
            this.link = exp.data.links.next
            this.loopT(this.link)
          })
          .catch(error => console.log(error.message))
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
      this.getMonth(this.s)
    },
    getMonth (list) {
      // console.log(list)
      var wdata = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        wdata.push(this.getNumt(this.barOptionsTime.xAxis.categories[i],list))
      }
      this.barOptionsTime.series[0].data = wdata
    },

    getNumt (name, sa) {
      var counter = 0
      for (var xt in sa) {
        if (sa[xt].exposure_date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },


    getTest () {
      var reg = []
      for (var r in this.barOptionsTest.xAxis.categories) {
        reg.push(this.getNumr(this.barOptionsTest.xAxis.categories[r]))
      }
      this.barOptionsTest.series[0].data = reg
    },

    getAllUsers () {
      if (this.user.role_id === 1) {
        axios.get('users')
          .then((exp) => {
            this.u = exp.data.meta.total
            this.userz = exp.data.data
            console.log(exp.data.data)
            this.link = exp.data.links.next
            this.loopG(this.link)
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`hcw/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.u = exp.data.meta.total
            this.userz = exp.data.data
            this.link = exp.data.links.next
            this.loopG(this.link)
          })
          .catch(error => console.log(error.message))
      }
    },
    getBroadcasts () {
      if (this.user.role_id === 1) {
        axios.get('broadcasts/web/all')
          .then((users) => {
            // console.log(users.data.meta.total)
            this.b = users.data.meta.total
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`broadcasts/web/history/${this.user.hcw.facility_id}`)
          .then((users) => {
            // console.log(users.data.meta.total)
            this.b = users.data.meta.total
          })
          .catch(error => console.log(error.message))
      }
    },

    async loopG (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.userz = this.userz.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.getTest()
    },

    getNumr (name) {
      var counter = 0
      for (var r in this.userz) {
        var dat = new Date(this.userz[r].created_at)
        var list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if (list[dat.getMonth()] === name) {
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
