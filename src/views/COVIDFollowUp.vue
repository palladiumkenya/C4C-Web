<template>
  <v-card>
    <v-container
      fill-height
      fluid
      grid-list-xl
      py-0>
      <v-layout
        justify-center
        wrap>
        <v-flex
          v-if="user.role_id === 1 || user.role_id === 2"
          xs12
          md2
        >
          <template>
            <v-combobox
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
          v-if="user.role_id !== 4"
          xs12
          md3
        >
          <template>
            <v-combobox
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
              @change="getFacilitysubcountyfilter"/>
          </template>
        </v-flex>
        <v-flex
          v-if="user.role_id !== 4"
          xs12
          md2
        >
          <template>
            <v-combobox
              v-if="user.role_id !== 4"
              v-model="partner"
              :items="all_partners"
              item-text="name"
              item-value="id"
              label="Select Partner"
              multiple
              disabled
              clearable
              persistent-hint
              chips/>
          </template>
        </v-flex>
        <v-flex
          v-if="user.role_id !== 4"
          xs12
          md2
        >
          <template>
            <v-combobox
              :items="all_facilities_level"
              :disabled="active_level"
              label="Select Facility Level"
              multiple
              clerable
              persistent-hint
              chips
              @change="getFacilitylevelfilter"/>
          </template>
        </v-flex>
        <v-flex
          v-if="user.role_id !== 4"
          xs12
          md3
        >
          <v-combobox
            v-model="facility"
            :items="fac"
            item-text="name"
            item-value="id"
            label="Select Facility"
            multiple
            clearable
            persistent-hint
            chips
            @change="getFacilityfilter"/>
        </v-flex>
        <template>
          <v-flex
            v-if="user.role_id === 4"
            xs12
            md2
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
            md2>
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
            md2>
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
      </v-layout>
    </v-container>
    <!-- End filters -->

    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Report By Symptoms</v-tab>
      <v-tab>Report By Covid Specific Training</v-tab>
      <v-tab>Risk Assessment reports</v-tab>
      <v-tab>Exposure management </v-tab>
      <v-tab>Risk Assesment Recommendation</v-tab>
      <v-tab-item
        v-for="n in 5"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n===1">
            <!-- Start Symptoms -->
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                  >
                  <div class="card vld-parent">
                    <loading
                      :active.sync="isLoading"
                      :can-cancel="false"
                      :is-full-page="false"
                      loader="bars"
                      color="#007bff"/>
                    <highcharts
                      ref="barChart"
                      :options="barOptionsSymptoms"/>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <!-- Start COVID Specific Training -->

          <v-card-text v-if="n===2">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsCovidTraining"/>
            </div>
          </v-card-text>

          <!-- Start Risk Assessment -->

          <v-card-text v-if="n===3">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsRisk"/>
            </div>
          </v-card-text>

          <!-- Start Exposure Management -->

          <v-card-text v-if="n===4">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsExpo"/>
            </div>
          </v-card-text>

          <!-- Start Date Returned To work -->

          <v-card-text v-if="n===5">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsDateReturn"/>
            </div>
          <!-- start list -->

          <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >

        <v-snackbar
          v-model="snackbar"
          :timeout="12000"
          color="error"
          top>
          <v-icon
            color="white"
            class="mr-3"
          >
            mdi-bell-plus
          </v-icon>
          <div> {{ output.error }} {{ result }}</div>
          <v-icon
            size="16"
            @click="snackbar = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>

        <material-card
          color="green"
          title="Broadcast Messages"
        >
          <v-card-text>
            <div/>
            <p class="display-0 text--primary">
              List of Wok Report
            </p>
          </v-card-text>
          <v-container py-0>
            <v-layout wrap>
              <v-flex
                xs12
                md10>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-search-web"
                  label="Search"
                  single-line
                  hide-details
                />
              </v-flex>
              <v-flex
                xs12
                md2>
                <v-btn
                  :loading="downloadLoading"
                  color="primary"
                  @click="handleDownload">
                  <v-icon left>mdi-download</v-icon>Export Excel
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container><br>

          <v-data-table
            :headers="headers"
            :items="s"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :loading="true"
          >

          <template slot='no-data'>
              <v-progress-linear slot='progress' indeterminate></v-progress-linear>
          </template>

            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ s.indexOf(props.item)+1 }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.facility }}</td>
                <td>{{ props.item.county }}</td>
                <td>{{ props.item.sub_county }}</td>
                <td>{{ props.item.risk_assessment_decision_date }}</td>
                <td>{{ props.item.isolation_start_date }}</td>
                <td>
                  <v-icon v-if="props.expanded">mdi-arrow-down</v-icon>
                  <v-icon v-else>mdi-arrow-right</v-icon>
                </td>
              </tr>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="success"
              icon="mdi-emoticon-sad">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>

          <!-- end list -->

          </v-card-text>

        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>

import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

exportingInit(Highcharts)
export default {

    computed: {
    cadreCount () {
      return this.c
    },

    ...mapGetters({
      user: 'auth/user'
    })
  },
  components: { highcharts: Chart, Loading },
    data () {
      return {
        rowsPerPageItems: [100, 500, 1000],
      search: '',
      link: '',
      output: '',
      result: '',
      snackbar: false,
      headers: [
        {
          text: 'No.',
          value: 'No.'
        },
        {
          sortable: false,
          text: 'Gender',
          value: 'gender'
        },
        {
          text: 'Cadre',
          value: 'cadre'
        },
        {
          text: 'Facility',
          value: 'facility'
        },
        {
          text: 'County',
          value: 'county'
        },
        {
          text: 'Sub County',
          value: 'sub_county'
        },
        {
          text: 'Date Stopped Working',
          value: 'risk_assessment_decision_date'
        },
        {
          text: 'Date Isolation Started',
          value: 'isolation_start_date'
        }
      ],

        //
        isLoading: true,
      partner: '',
      cadres: [],
      facility: '',
      counties: '',
      subcounties: '',
      all_facilities_level: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5 and Above'],
      all_facilities: [],
      all_subcounties: [],
      all_counties: [],
      all_partners: [],
      fac: [],
      active: true,
      active_fac: true,
      active_level: true,
      menu: false,
      menu1: false,
      startDate: '2020-03-01',
      maxDate: new Date().toISOString().substr(0, 10),
      minDate: '2020-03-01',
      endDate: new Date().toISOString().substr(0, 10),
      value: true,
      value1: true,

      // by symptoms
      barOptionsSymptoms: {
        xAxis: {
          categories: ['Fever', 'Cough', 'Fatigue', 'Loss of appetite', 'Difficulty in Breathing', 'Muscle pains', 'Sore throat', 'Nasal congestion', 'Headache', 'Diarrhea', 'Nausea', 'Vomiting', 'Loss of smell', 'Loss of smell'],
          title: {
            text: 'Symptoms'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
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
          text: 'Covid 19 Symptoms Reports'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // by exposure management

      barOptionsExpo: {
        xAxis: {
          categories: ['Home Quarantine', 'Center Quarantine', 'Hospital Quarantine', 'Hospital Isolation', 'Home-based Care'],
          title: {
            text: 'Exposure Management'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
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
          text: 'Covid 19 Exposures Management'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      //by Risk Assessment
      barOptionsRisk: {
        xAxis: {
          categories: ['High risk', 'Low risk'],
          title: {
            text: 'Risk Assessment' 
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
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
        text: 'Risk Assessment Reports'
      },
      series: [
        {
          colorByPoint: true,
          name: 'Numbers',
          data: []
        }
      ]
    }, 

    // date returned to work  
      barOptionsDateReturn: {
        xAxis: {
          categories: ['Stop working', 'Return to work'],
          title: {
            text: 'Risk Assesment Recommendation'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
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
          text: 'Risk Assesment Recommendation'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // covid specific training  
      barOptionsCovidTraining: {
        xAxis: {
          categories: ['Yes', 'No'],
          title: {
            text: 'Covid Specific Training'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures',
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
          text: 'HCWs With COVID Specific Training'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      load: true,
      fac_filt: [],
      fac_filtl: [],
      fac_filtf: [],
      exp_filt: [],
      exp_filtl: [],
      exp_filtf: [],
      s: [],
      cadre: [],
      dob: [],
      date: [],
      users: [],
      gender: [],
      hours: [],
      ipc_training: []

    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      token: 'auth/token',
      e: 'auth/expo'
    })
  },

    created () {
        this.getcovidExpo()
        this.getCounties()
        this.getFacilities()
       // this.getCad()
        this.getPartners()
        this.dateRange('2020-01-20', this.endDate)
        axios.get('cadres')
      .then((c) => {
        this.cadres = c.data.data
      })

      if (this.s.length === 0) {
      this.getcovidExpo()
    } else {
      this.s = this.e
    }
    },

    methods: {

      click () {
      let expo = []
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
          expo.push(this.s[e])
        }
      }
      this.getcovidData(expo)
    },

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          this.all_facilities = facilities.data.data
          if (this.user.role_id === 5) {
            this.subCounties()
          }
        })
        .catch(error => console.log(error.message))
    },

    getCounties () {
      axios.get('counties')
        .then((counties) => {
          this.all_counties = counties.data.data
        })
        .catch(error => console.log(error.message))
    },
    subCounties () {
      axios.get('counties')
        .then((counties) => {
          for (var x in counties.data.data) {
            if (this.user.hcw.county === counties.data.data[x].name) {
              this.getSubCounties([counties.data.data[x]])
            }
          }
        })
        .catch(error => console.log(error.message))
    },

    getSubCounties (a) {
      if (a.length > 0) {
        this.active = false
        this.all_subcounties = []
        for (var x in a) {
          axios.get(`subcounties/${a[x].id}`)
            .then((subcounties) => {
              this.all_subcounties = this.all_subcounties.concat(subcounties.data.data)
            })
            .catch(error => console.log(error.message))
        }
        this.getFacilitycountyfilter(a)
      } else {
        this.active = true
        this.getFacilitycountyfilter(a)
      }
    },
     getPartners () {
      axios.get('partners') 
        .then((partners) => {
          this.all_partners = partners.data.data
        })
        .catch(error => console.log(error.message))
    },
    
    // filters
    getFacilitycountyfilter (a) {
      this.fac_filt = []
      this.exp_filt = []
      if (a.length > 0) {
        for (var c in a) {
          for (var ai in this.all_facilities) {
            if (this.all_facilities[ai].county === a[c].name) {
              this.fac_filt.push(this.all_facilities[ai])
            }
          }
          for (var e in this.s) {
            if (this.s[e].county === a[c].name) {
              this.exp_filt.push(this.s[e])
            }
          }
        }
        this.getcovidData(this.exp_filt)
        this.fac = this.fac_filt.sort()
      } else {
        this.getcovidData(this.s)
        this.fac = this.all_facilities
      }
    },
    getFacilitysubcountyfilter (fsb) {
      this.exp_filtl = []
      this.fac_filtl = []
      this.active_level = false
      if (fsb.length > 0) {
        for (var sb in fsb) {
          for (var a in this.fac_filt) {
            if (this.fac_filt[a].sub_county === fsb[sb].name) {
              this.fac_filtl.push(this.fac_filt[a])
            }
          }
          for (var e in this.exp_filt) {
            if (this.exp_filt[e].sub_county === fsb[sb].name) {
              this.exp_filtl.push(this.exp_filt[e])
            }
          }
        }

        this.getcovidData(this.exp_filtl)
        this.fac = this.fac_filtl.sort()
      } else {
        this.getcovidData(this.exp_filt)
        this.fac = this.fac_filt
        this.active_level = true
      }
    },

    getFacilitylevelfilter (fl) {
      this.fac_filtf = [], this.exp_filtf = []
      this.active_fac = false
      if (fl.length > 0) {
        for (var l in fl) {
          for (var a in this.fac_filtl) {
            if (this.fac_filtl[a].level == fl[l]) {
              this.fac_filtf.push(this.fac_filtl[a])
            } else if (fl[l] === 'Level 5 and Above') {
              if (Number(this.fac_filtl[a].level.slice(6, 7)) >= 5) {
                this.fac_filtf.push(this.fac_filtl[a])
              }
            }
          }
          for (var e in this.exp_filtl) {
            if (this.exp_filtl[e].facility_level === fl[l]) {
              this.exp_filtf.push(this.exp_filtl[e])
            } else if (fl[l] === 'Level 5 and Above') {
              if (Number(this.exp_filtl[e].facility_level.slice(6, 7)) >= 5) {
                this.exp_filtf.push(this.exp_filtl[e])
              }
            }
          }
        }

        this.getcovidData(this.exp_filtf)
        this.fac = this.fac_filtf.sort()
      } else {
        this.getcovidData(this.exp_filtl)
        this.fac = this.fac_filtl
        this.active_fac = true
      }
    },

    getFacilityfilter (f) {
      let exp = []
      if (f.length > 0) {
        for (var s in f) {
          for (var e in this.exp_filtf) {
            if (this.exp_filtf[e].facility === f[s].name) {
              exp.push(this.exp_filtf[e])
            }
          }
        }
        this.getcovidData(exp)
      } else {
        this.getcovidData(this.exp_filtf)
      }
    },

    cadreFilter (a) {
      this.fac_filt = []
      this.exp_filt = []
      if (a.length > 0) {
        for (var c in a) {
          for (var ex in this.s) {
            if (this.s[ex].cadre === a[c].name) {
              this.exp_filt.push(this.s[ex])
            }
          }
        }
        this.getcovidData(this.exp_filt)
        this.fac = this.fac_filt.sort()
      } else {
        this.fac = this.all_facilities
        this.getcovidData(this.s)
      }
    },
    // end filter
    getcovidExpo () {
      if (this.user.role_id === 1 || this.user.role_id === 2 || this.user.role_id === 5) {
        axios.get(`exposures/covid/all`)
          .then((response) => {
              this.s = response.data.data
              console.log(this.s)
              if (response.data.links.next != null) {
              this.link = response.data.links.next
              this.loopT(this.link)
              this.isLoading = false
            } else {
              this.getcovidData(this.s)
            }
          })
          
          .catch(error => console.log(error.message))
          .catch(() => {
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      }else if (this.user.role_id === 4) {
        axios.get(`exposures/covid/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.s = exp.data.data
            if (exp.data.links.next != null) {
              this.link = exp.data.links.next
              this.loopT(this.link)
              this.isLoading = false
            } else {
              this.getcovidData(this.s)
            }
          })
          .catch(error => console.log(error.message))
          .catch(() => {
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      }
    },
     async loopT (l) {
      var i; var u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.s = this.s.concat(response.data.data)
        } else {
          i = 11
        }
      }
      if (this.user.role_id === 5) {
        this.active = false
        for (var i in this.s) {
          if (this.s[i].county == this.user.county) {
            u.push(this.s[i])
          }
        }
        this.covid = u
      }
      this.getcovidData(this.s)
      this.isLoading = false
    },

    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Gender', 'Cadre','Facility', 'County', 'Sub County', 'Date Stopped Working', 'Date Isolation Started']
        const filterVal = ['gender', 'cadre', 'facility', 'county', 'sub_county', 'risk_assessment_decision_date' ,'isolation_start_date']
        const list = this.s
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (v[j] === '') {
          return 'Not Specified'
        } else {
          return v[j]
        }
      }))
    },
    
    getcovidData (list) {
      this.load = true
      var data = []
      for (var i in this.barOptionsSymptoms.xAxis.categories) {
        data.push(this.getSymNum(this.barOptionsSymptoms.xAxis.categories[i], list))
      }
      this.barOptionsSymptoms.series[0].data = data

      var data = []

      for (var i in this.barOptionsExpo.xAxis.categories) {
        data.push(this.getExpoMan(this.barOptionsExpo.xAxis.categories[i], list))
      }
      this.barOptionsExpo.series[0].data = data

      var data = []
      for (var i in this.barOptionsRisk.xAxis.categories) {
        data.push(this.getRisk(this.barOptionsRisk.xAxis.categories[i], list))
      }
      this.barOptionsRisk.series[0].data = data

      var data = []
      for (var i in this.barOptionsCovidTraining.xAxis.categories) {
        data.push(this.getCovidTraining(this.barOptionsCovidTraining.xAxis.categories[i], list))
      }
      this.barOptionsCovidTraining.series[0].data = data

      var data = []
      for (var i in this.barOptionsDateReturn.xAxis.categories) {
        data.push(this.getDateReturn(this.barOptionsDateReturn.xAxis.categories[i], list))
        console.log(data)
      }
      this.barOptionsDateReturn.series[0].data = data

      this.value = false
      this.load = false
      this.isLoading = false

    },
    getRisk (cat, g) {
      var count = 0
      for (var x in g) {
        if (g[x].risk_assessment_outcome === cat) {
          count++
        }
      }
      return count
    },
    getCovidTraining (cat, t) {
      var count = 0
      for (var x in t) {
        if (t[x].covid_specific_training === cat) {
          count++
        }
      }
      return count
    },
    getExpoMan (ipc, c) {
        var counter = 0
        for (var p in c) {
            if (c[p].exposure_management === ipc) {
                counter++
            }
        }
        return counter
    },
    getSymNum (symptoms, c) {
        var counter = 0
      for (var xc in c) {
        var symp1 = c[xc].symptoms.split(',')[0].slice(0).trim()
        var symp2 = c[xc].symptoms.split(',')[1].slice(0).trim()
  
        if (symp1 === symptoms) {
          counter++
        } else if (symp2 === symptoms) {
          counter++
        } 
      }
      return counter
    },
    getDateReturn (name, expo) {
      var counter = 0
      for (var xt in expo) {
        if (expo[xt].risk_assessment_recommendation === name) {
          counter++
        }
      }
      return counter
    },

    dateRange (startDate, endDate) {
      var start = startDate.split('-')
      var end = endDate.split('-')
      var startYear = parseInt(start[0])
      var endYear = parseInt(end[0])
      var dates = []

      for (var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1
        var startMon = i === startYear ? parseInt(start[1]) - 1 : 0
        for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
          var month = j + 1
          var displayMonth = month < 10 ? '0' + month : month
          dates.push([i, displayMonth, '01'].join('-'))
          
        }
      }
      return dates
    }
  }
}
</script>