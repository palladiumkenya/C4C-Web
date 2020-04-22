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
                v-on:change="facilitySubCounty"
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
                v-on:change="facilityLevel"
                :disabled="active_level"
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
                v-on:change="facilityFilter"
                :disabled="active_fac"
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
        md8
        lg12
        >
        <v-card>
          <!-- <v-overlay
            :absolute="true"
            :value="true"
          > -->
            <v-progress-circular
              v-if="load"
              :width="3"
              color="red"
              indeterminate
            ></v-progress-circular>
          <!-- </v-overlay> -->
          <highcharts
            ref="barChart"
            :options="barOptionsTest"/>
        </v-card>
      </v-flex>
      <!-- End Graphs -->
      <v-flex
        sm3
        xs8
        md8
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
      active_fac: true,
      active_level: true,
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
      load: true,
      u: 0,
      b: 0,
      scount: 0,
      fac_filt: [],
      exp_filt: [],
      us_filt: [],
      fac_filtl: [],
      exp_filtl: [],
      us_filtl: [],
      fac_filtf: [],
      exp_filtf: [],
      us_filtf: [],
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
    this.getExp()
    this.getBroadcasts()
    this.getAllUsers()
    this.getFacilities()
    this.getCounties()
  },
  methods: {

    click () {
    //  EventBus.emit("btn-clicked", {
    //    newData: [100, 12800, 500]
    //  });
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
      console.log(a)
      if (a.length > 0) {
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
      } else {
        this.active = true
        this.facilityCounty(a)
      }
    },
    facilityCounty (a) {
      this.us_filt =[],this.fac_filt = [], this.exp_filt = []
      if (a.length > 0) {
        for (var c in a) {
          // console.log(a[c].name)
          for (var f in this.all_facilities) {
            if (this.all_facilities[f].county == a[c].name) {
              this.fac_filt.push(this.all_facilities[f])
              for (var u in this.userz) {
                if (this.userz[u].facility_id == this.all_facilities[f].id) {
                  this.us_filt.push(this.userz[u])
                }
              }
            }
          }
          for (var ex in this.s) {
            if (this.s[ex].county == a[c].name) {
              this.exp_filt.push(this.s[ex])
              // console.log(this.s[ex])
            }
          }
        }
        this.getTest(this.us_filt)
        this.getMonth(this.exp_filt)
        this.fac = this.fac_filt.sort()
      } else {
        this.fac = this.all_facilities
        this.getTest(this.userz)
        this.getMonth(this.s)
      }
    },
    facilitySubCounty (a) {
      this.exp_filtl = [], this.fac_filtl = [], this.us_filtl = []
      this.active_level = false
      if (a.length > 0) {
        for (var c in a) {
          // console.log(a[c].name)
          for (var f in this.fac_filt) {
            if (this.fac_filt[f].sub_county == a[c].name) {
              this.fac_filtl.push(this.fac_filt[f])
              for (var u in this.userz) {
                if (this.userz[u].facility_id == this.fac_filt[f].id) {
                  this.us_filtl.push(this.userz[u])
                }
              }
            }
          }
          for (var ex in this.exp_filt) {
            if (this.exp_filt[ex].sub_county == a[c].name) {
              this.exp_filtl.push(this.exp_filt[ex])
            }
          }
          // for (var u in this.us_filt) {
          //   if (this.us_filt[u].sub_county == a[c].name) {
          //     us.push(this.us_filt[u])
          //   }
          // }
        }
        this.getTest(this.us_filtl)
        this.getMonth(this.exp_filtl)
        this.fac = this.fac_filtl.sort()
      } else {
        this.fac = this.fac_filt
        this.getTest(this.us_filt)
        this.getMonth(this.exp_filt)
        this.active_level = true
      }
    },

    facilityLevel (a) {
      this.fac_filtf = [], this.exp_filtf = [], this.us_filtf = []
      this.active_fac = false
      console.log(a)
      if (a.length > 0) {
        for (var c in a) {
          for (var f in this.fac_filtl) {
            if (this.fac_filtl[f].level == a[c]) {
              this.fac_filtf.push(this.fac_filtl[f])
            } else if (a[c]== 'Level 5 and Above') {
              if (Number(this.fac_filtl[f].level.slice(6,7)) >= 5) {
                this.fac_filtf.push(this.fac_filtl[f])
              }
            }
          }
          for (var ex in this.exp_filtl) {
            if (this.exp_filtl[ex].facility_level == a[c]) {
              this.exp_filtf.push(this.exp_filtl[ex])
            } else if (a[c]== 'Level 5 and Above') {
              if (Number(this.exp_filtl[ex].facility_level.slice(6,7)) >= 5) {
                this.exp_filtf.push(this.exp_filtl[ex])
              }
            }
          }
          for (var u in this.us_filtl) {
            if (this.us_filtl[u].facility_level == a[c]) {
              this.us_filtf.push(this.us_filtl[u])
            } else if (a[c]== 'Level 5 and Above') {
              if (Number(this.us_filtl[u].facility_level.slice(6,7)) >= 5) {
                this.us_filtf.push(this.us_filtl[u])
              }
            }
          }
          
        }
        this.getTest(this.us_filtf)
        this.getMonth(this.exp_filtf)
        this.fac = this.fac_filtf.sort()
      } else {
        this.fac = this.fac_filtl
        this.getTest(this.us_filtl)
        this.active_fac = true
        this.getMonth(this.exp_filtl)
      }
    },

    facilityFilter (a) {
      let b = [], e = [], us = []

      if (a.length > 0) {
        for (var c in a) {
          for (var ex in this.exp_filtf) {
            if (this.exp_filtf[ex].facility_name == a[c].name) {
              e.push(this.exp_filtf[ex])
            }
          }
          for (var u in this.us_filtf) {
            if (this.us_filtf[u].facility_name == a[c].name) {
              us.push(this.us_filtf[u])
            }
          }
          
        }
        this.getTest(us)
        this.getMonth(e)
      } else {
        this.getTest(this.us_filtf)
        this.getMonth(this.exp_filtf)
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


    getAllUsers () {
      if (this.user.role_id === 1) {
        axios.get('hcw')
          .then((exp) => {
            this.u = exp.data.meta.total
            this.userz = exp.data.data
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
      this.getTest(this.userz)
    },

    getTest (list) {
      this.load = true
      var reg = []
      for (var r in this.barOptionsTest.xAxis.categories) {
        reg.push(this.getNumr(this.barOptionsTest.xAxis.categories[r], list))
      }
      this.barOptionsTest.series[0].data = reg
      this.load = false
    },
    
    getNumr (name, li) {
      var counter = 0
      for (var r in li) {
        var dat = new Date(li[r].created_at)
        var list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if (list[dat.getMonth()] === name) {
          counter++
        }
      }
      return counter
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
