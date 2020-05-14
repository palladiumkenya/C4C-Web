<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap>

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

        <v-container py-0>
          <v-layout wrap>
            <v-flex
              xs10
              md2
            >
              <template>
                <v-combobox
                  v-if="user.role_id != 4"
                  v-model="counties"
                  :items="all_counties"
                  item-text="name"
                  item-value="id"
                  label="Select County"
                  multiple
                  clearable
                  persistent-hint
                  chips
                  @change="getSubCounties"/>
              </template>
            </v-flex>
            <v-flex
              xs10
              md2
            >
              <template>
                <v-combobox
                  v-if="user.role_id != 4"
                  v-model="subcounties"
                  :items="all_subcounties"
                  :disabled="active"
                  item-text="name"
                  item-value="id"
                  label="Select Sub-County"
                  multiple
                  clearable
                  persistent-hint
                  chips
                  @change="facilitySubCounty"/>

              </template>
            </v-flex>

            <v-flex
              xs10
              md2
            >
              <template>
                <v-combobox
                  v-if="user.role_id != 4"
                  v-model="partner"
                  :items="fac"
                  item-text="partner"
                  item-value="id"
                  label="Select Partner"
                  multiple
                  clearable
                  disabled
                  persistent-hint
                  chips/>

              </template>
            </v-flex>

            <v-flex
              xs10
              md2
            >
              <template>
                <v-combobox
                  v-if="user.role_id != 4"
                  :items="all_facilities_level"
                  :disabled="active_level"
                  label="Select Facility Level"
                  multiple
                  clearable
                  persistent-hint
                  chips
                  @change="facilityLevel"/>

              </template>
            </v-flex>

            <v-flex
              xs10
              md4
            >
              <template>
                <v-combobox
                  v-if="user.role_id != 4"
                  v-model="facility"
                  :items="fac"
                  :disabled="active_fac"
                  item-text="name"
                  item-value="id"
                  label="Select Facility"
                  multiple
                  clearable
                  persistent-hint
                  chips
                  @change="facilityFilter"/>

              </template>
            </v-flex>
          </v-layout>
        </v-container>

        <template>
          <v-flex
            v-if="user.role_id === 4"
            xs10
            md4
          >
            <v-combobox
              :items="cadres"
              item-text="name"
              item-value="id"
              label="Select Cadre"
              multiple
              clearable
              persistent-hint
              chips
              @change="cadreFilter"/>
          </v-flex>
          <v-flex
            xs12
            sm6
            md2
            lg2>
            <v-menu
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              :return-value.sync="startDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
              />
              <v-date-picker
                :dark="true"
                v-model="startDate"
                :max="endDate"
                :min="minDate"
                no-title
                scrollable>
                <v-spacer/>
                <v-btn
                  flat
                  color="primary"
                  @click="menu1 = false">Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="click();$refs.menu1.save(startDate);click">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
            xs12
            sm6
            md2
            lg2>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="endDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
              />
              <v-date-picker
                :dark="true"
                v-model="endDate"
                :max="maxDate"
                :min="startDate"
                no-title
                scrollable>
                <v-spacer/>
                <v-btn
                  flat
                  color="primary"
                  @click="menu = false">Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="click();$refs.menu.save(endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </template>

        <!-- <v-flex xs12 sm6 md2 lg2>
          <v-btn
            block
            color="secondary"
            @click="click">Filter
          </v-btn>
        </v-flex> -->

        <!-- End filters -->
      </template>

      <!-- Start Graphs -->
      <v-flex
        sm3
        xs12
        md12
        lg12
      >
        <div class="card vld-parent">
          <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="fullPage"
            loader="bars"
            color="#007bff"/>
          <highcharts
            ref="barChart"
            :options="barOptionsTest"/>
        </div>
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
          <v-flex
                  xs12
                  md12
                >
                  <div class="map">
                    <l-map
                      :center="[0.559, 38.2]"
                      :zoom="6"
                      :options="mapOptions"
                      style="height: 500px;">
                      <l-choropleth-layer
                        :data="mapdata"
                        :value="values"
                        :geojson="paraguayGeojson"
                        :color-scale="colorScale"
                        :stroke-color="currentStrokeColor"
                        title-key="department_name"
                        id-key="department_id"
                        geojson-id-key="dpto">
                        <template slot-scope="props">
                          <l-info-control
                            :item="props.currentItem"
                            :unit="props.unit"
                            class="bcols"
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
                </v-flex>
      <!-- End Maps -->

    </v-layout>
  </v-container>
</template>

<script>
import { Chart } from 'highcharts-vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import { mapGetters, mapActions } from 'vuex'
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import * as geojson from '../vendor/data'
import paraguayGeojson from '../vendor/counties.json'
import { pyDepartmentsData } from '../vendor/para_dep'
import { LMap } from 'vue2-leaflet'


exportingInit(Highcharts)

export default {
  components: {
    Loading,
    highcharts: Chart,
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer
  },
  data () {
    return {
      cadres: [],
      partner: [],
      isLoading: true,
      fullPage: false,
      menu: false,
      menu1: false,
      startDate: '2016-01-01',
      maxDate: new Date().toISOString().substr(0, 10),
      minDate: '2016-01-01',
      endDate: new Date().toISOString().substr(0, 10),
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
            text: 'Months - Year'
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
          text: 'Monthly Exposure'
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
            text: 'Months - Year'
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
          text: 'Registration by Month'
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
      s: [],
      userz: [],
      load: true,
      u: 0,
      b: 0,
      scount: 0,
      broad: [],
      fac_filt: [],
      exp_filt: [],
      us_filt: [],
      fac_filtl: [],
      exp_filtl: [],
      us_filtl: [],
      fac_filtf: [],
      exp_filtf: [],
      us_filtf: [],

      pyDepartmentsData,
      paraguayGeojson,
      colorScale: geojson.colorArray,
      values: {
        key: 'exposures',
        metric: 'exposures'
        
      },
      values: {
        key: 'exposures',
        metric: 'exposures'
        
      },
      extraValues: [{
      
      }],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '200004',
      mapdata: []
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
      user: 'auth/user',
      auth: 'auth/token',
      e: 'auth/expo',
      all_users: 'auth/us_all',
      us_no: 'auth/us_no',
      next_link: 'auth/next_link'
    })
  },
  created () {
    if (this.auth === null) {
      alert('Not Logged in')
      this.$router.replace({
        name: 'login'
      })
    }
    if (this.e.length === 0) { this.getExp() } else { this.getMonth(this.e); this.scount = this.e.length; this.s = this.e }
    if (this.us_no === 0) {
      this.getAllUsers()
    } else if (this.all_users.length !== this.us_no) {
      this.u = this.us_no
      this.loopG(this.next_link)
    } else {
      this.userz = this.all_users
      this.u = this.us_no
      this.getTest(this.all_users)
      this.isLoading = false
    }
    this.getBroadcasts()
    // this.getAllUsers()
    this.getFacilities()
    this.getCounties()
    axios.get('cadres')
      .then((c) => {
        this.cadres = c.data.data
      })
  },
  methods: {
    click () {
      let exp = []; let us = []
      var dates = {
        convert: function (d) {
          return (
            d.constructor === Date ? d
              : d.constructor === Array ? new Date(d[0], d[1], d[2])
                : d.constructor === Number ? new Date(d)
                  : d.constructor === String ? new Date(d)
                    : typeof d === 'object' ? new Date(d.year, d.month, d.date)
                      : NaN
          )
        },
        inRange: function (d, start, end) {
          return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf())
              ? start <= d && d <= end
              : NaN
          )
        }
      }
      for (var e in this.s) {
        var i = new Date(this.s[e].created_at).toISOString().substr(0, 10)
        if (dates.inRange(i, this.startDate, this.endDate)) {
          exp.push(this.s[e])
        }
      }
      for (var u in this.userz) {
        var i = new Date(this.userz[u].created_at).toISOString().substr(0, 10)
        if (dates.inRange(i, this.startDate, this.endDate)) {
          us.push(this.userz[u])
        }
      }
      this.getTest(us)
      this.getMonth(exp)
      this.getMapData(us)
      this.getMapData(exp)
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
      if (a.length > 0) {
        this.active = false
        this.all_subcounties = []
        for (var i in a) {
          axios.get(`subcounties/${a[i].id}`)
            .then((subcounties) => {
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
      this.us_filt = []
      this.fac_filt = []
      this.exp_filt = []
      if (a.length > 0) {
        for (var c in a) {
          for (var f in this.all_facilities) {
            if (this.all_facilities[f].county === a[c].name) {
              this.fac_filt.push(this.all_facilities[f])
            }
          }
          for (var ex in this.s) {
            if (this.s[ex].county === a[c].name) {
              this.exp_filt.push(this.s[ex])
              // console.log(this.s[ex])
            }
          }
          for (var u in this.userz) {
            if (this.userz[u].county === a[c].name) {
              this.us_filt.push(this.userz[u])
            }
          }
        }
        this.getTest(this.us_filt)
        this.getMonth(this.exp_filt)
        this.getMapData(this.us_filt)
        this.getMapData(this.exp_filt)
        this.fac = this.fac_filt.sort()
      } else {
        this.fac = this.all_facilities
        this.getTest(this.userz)
        this.getMonth(this.s)
        this.getMapData(this.userz)
        this.getMapData(this.s)
      }
    },
    facilitySubCounty (a) {
      this.exp_filtl = []
      this.fac_filtl = []
      this.us_filtl = []
      this.active_level = false
      if (a.length > 0) {
        for (var c in a) {
          // console.log(a[c].name)
          for (var f in this.fac_filt) {
            if (this.fac_filt[f].sub_county === a[c].name) {
              this.fac_filtl.push(this.fac_filt[f])
            }
          }
          for (var ex in this.exp_filt) {
            if (this.exp_filt[ex].sub_county === a[c].name) {
              this.exp_filtl.push(this.exp_filt[ex])
            }
          }
          for (var u in this.us_filt) {
            if (this.us_filt[u].sub_county === a[c].name) {
              this.us_filtl.push(this.us_filt[u])
            }
          }
        }
        this.getTest(this.us_filtl)
        this.getMonth(this.exp_filtl)
        this.getMapData(this.us_filtl)
        this.getMapData(this.exp_filtl)
        this.fac = this.fac_filtl.sort()
      } else {
        this.fac = this.fac_filt
        this.getTest(this.us_filt)
        this.getMonth(this.exp_filt)
        this.getMapData(this.us_filt)
        this.getMapData(this.exp_filt)
        this.active_level = true
      }
    },

    facilityLevel (a) {
      this.fac_filtf = []
      this.exp_filtf = []
      this.us_filtf = []
      this.active_fac = false
      console.log(a)
      if (a.length > 0) {
        for (var c in a) {
          for (var f in this.fac_filtl) {
            if (this.fac_filtl[f].level === a[c]) {
              this.fac_filtf.push(this.fac_filtl[f])
            } else if (a[c] === 'Level 5 and Above') {
              if (Number(this.fac_filtl[f].level.slice(6, 7)) >= 5) {
                this.fac_filtf.push(this.fac_filtl[f])
              }
            }
          }
          for (var ex in this.exp_filtl) {
            if (this.exp_filtl[ex].facility_level === a[c]) {
              this.exp_filtf.push(this.exp_filtl[ex])
            } else if (a[c] === 'Level 5 and Above') {
              if (Number(this.exp_filtl[ex].facility_level.slice(6, 7)) >= 5) {
                this.exp_filtf.push(this.exp_filtl[ex])
              }
            }
          }
          for (var u in this.us_filtl) {
            if (this.us_filtl[u].facility_level === a[c]) {
              this.us_filtf.push(this.us_filtl[u])
            } else if (a[c] === 'Level 5 and Above') {
              if (Number(this.us_filtl[u].facility_level.slice(6, 7)) >= 5) {
                this.us_filtf.push(this.us_filtl[u])
              }
            }
          }
        }
        this.getTest(this.us_filtf)
        this.getMonth(this.exp_filtf)
        this.getMapData(this.us_filtf)
        this.getMapData(this.exp_filtf)
        this.fac = this.fac_filtf.sort()
      } else {
        this.fac = this.fac_filtl
        this.getTest(this.us_filtl)
        this.active_fac = true
        this.getMonth(this.exp_filtl)
        this.getMapData(this.us_filtl)
        this.getMapData(this.exp_filtl)
      }
    },

    facilityFilter (a) {
      let b = []; let e = []; let us = []
      if (a.length > 0) {
        for (var c in a) {
          for (var ex in this.exp_filtf) {
            if (this.exp_filtf[ex].facility_id === a[c].id) {
              e.push(this.exp_filtf[ex])
            }
          }
          for (var u in this.us_filtf) {
            if (this.us_filtf[u].facility_name === a[c].name) {
              us.push(this.us_filtf[u])
            }
          }
        }
        this.getTest(us)
        this.getMonth(e)
        this.getMapData(e)
        this.getMapData(us)
      } else {
        this.getTest(this.us_filtf)
        this.getMonth(this.exp_filtf)
        this.getMapData(this.us_filtf)
        this.getMapData(this.exp_filtf)
      }
    },

    cadreFilter (a) {
      this.us_filt = []
      this.fac_filt = []
      this.exp_filt = []
      if (a.length > 0) {
        for (var c in a) {
          for (var ex in this.s) {
            console.log(this.s[ex])
            if (this.s[ex].cadre === a[c].name) {
              this.exp_filt.push(this.s[ex])
              // console.log(this.s[ex])
            }
          }
          for (var u in this.userz) {
            if (this.userz[u].cadre_id === a[c].id) {
              this.us_filt.push(this.userz[u])
            }
          }
        }
        this.getTest(this.us_filt)
        this.getMonth(this.exp_filt)
       // this.getMapData(this.exp_filt)
        //this.getMapData(this.us_filt)
        this.fac = this.fac_filt.sort()
      } else {
        this.fac = this.all_facilities
        this.getTest(this.userz)
       // this.getMapData(this.userz)
        this.getMonth(this.s)
        //this.getMapData(this.s)

      }
    },

    getMapData(c){
      var a = []; var b = []; var prev; var count = 0; var arr = []
      this.mapdata = []
      for(var k in c){
        arr.push(c[k].county)
      }
      arr.sort()
      for(var i = 0; i < arr.length; i++ ){
        if(arr[i] !== prev){
          a.push(arr[i])
          b.push(1)
        }else {
         b[b.length - 1]++
      }
      prev = arr[i]
      }
      for(var d in pyDepartmentsData){
        pyDepartmentsData[d].exposures = b[i]
      }
       for (var i in a) {
        for (var e in pyDepartmentsData) {
          if (a[i] === pyDepartmentsData[e].department_name) {
            pyDepartmentsData[e].exposures = b[i]
          }
          this.mapdata = pyDepartmentsData
        }
      }
      console.log(this.mapdata)
       for(var u in pyDepartmentsData){
        pyDepartmentsData[d].hcw = b[i]
      }
       for (var i in a) {
        for (var e in pyDepartmentsData) {
          if (a[i] === pyDepartmentsData[e].department_name) {
            pyDepartmentsData[e].hcw = b[i]
          }
          this.mapdata = pyDepartmentsData
        }
      }

    },

    getExp () {
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        const proxyurl = 'https://evening-brushlands-82997.herokuapp.com/'
        axios.get(proxyurl + 'http://c4ctest.mhealthkenya.org/api/exposures/all/')
          .then((exp) => {
            this.scount = exp.data.meta.total
            this.s = exp.data.data
            this.link = exp.data.links.next
            this.loopT(this.link)
          })
          .catch(error => {
            console.log(error.message)
          })
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
      var i; var e = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
          this.storeExp(this.s)
          this.getMonth(this.e)
        } else {
          i = 11
        }
      }
      if (this.user.role_id === 5) {
        for (var ex in this.s) {
          if (this.s[ex].county === this.user.hcw.county) {
            e.push(this.s[ex])
          }
        }
        this.scount = e.length
        this.s = e
      }

      this.getMonth(this.s)
      this.getMapData(this.s)
    },

    getMonth (list) {
      // console.log(list)
      var wdata = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        wdata.push(this.getNumt(this.barOptionsTime.xAxis.categories[i], list))
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

    ...mapActions({
      storeExp: 'auth/storeExp',
      storeAllUsers: 'auth/storeUser',
      storeUsNo: 'auth/storeUsNo'
    }),

    getAllUsers () {
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        axios.get('hcw')
          .then((exp) => {
            if (this.user.role_id === 5) {
              this.u = 'loading...'
            } else {
              this.u = exp.data.meta.total
              this.storeUsNo(exp.data)
            }
            this.userz = exp.data.data
            this.storeAllUsers(this.userz)
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
            this.storeAllUsers(this.userz)
            this.loopG(this.link)
          })
          .catch(error => console.log(error.message))
      }
    },

    async loopG (l) {
      var i; var u = []
      this.userz = this.all_users
      console.log(this.userz)
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.userz = this.userz.concat(response.data.data)
          this.storeAllUsers(this.userz)
          this.storeUsNo(response.data)
          this.getTest(this.userz)
        } else {
          i = 11
        }
      }
      if (this.user.role_id === 5) {
        for (var ex in this.userz) {
          if (this.userz[ex].county === this.user.hcw.county) {
            u.push(this.userz[ex])
          }
        }
        this.userz = u
        this.u = u.length
      }
      this.getTest(this.userz)
      this.getMapData(this.userz)
      this.isLoading = false
    },

    getTest (list) {
      this.load = true
      var reg = []
      for (var r in this.barOptionsTest.xAxis.categories) {
        reg.push(this.getNumr(this.barOptionsTest.xAxis.categories[r], list))
      }
      this.barOptionsTest.series[0].data = reg
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
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        axios.get('broadcasts/web/all')
          .then((users) => {
            if (this.user.role_id === 5) {
              this.broad = users.data.data
              this.loopBroad(users.data.links.next)
            } else {
              this.b = users.data.meta.total
            }
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`broadcasts/web/history/${this.user.hcw.facility_id}`)
          .then((users) => {
            this.b = users.data.meta.total
          })
          .catch(error => console.log(error.message))
      }
    },
    async loopBroad (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.broad = this.broad.concat(response.data.data)
        } else {
          i = 11
        }
      }
      for (var ex in this.broad) {
        if (this.broad[ex].facility) {
          if (this.broad[ex].facility.county === this.user.hcw.county) {
            this.b += 1
          }
        }
      }
    }
  }

}
</script>

<style scoped>
@import "../../node_modules/leaflet/dist/leaflet.css";
body {
  background-color: #e7d090;
  margin-left: 100px;
  margin-right: 100px;
}
#map {
  background-color: #eee;
}
</style>
