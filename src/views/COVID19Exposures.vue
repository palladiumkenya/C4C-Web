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

      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Contact</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>IPC Training</v-tab>
      <v-tab>PPE Present</v-tab>
      <v-tab>PPE Worn</v-tab>
      <v-tab>PCR Test</v-tab>

      <v-tab-item
        v-for="n in 10"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n===1">
            <!-- Start Exposure Month -->
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
                      :options="barOptionsMonth"/>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <!-- Start Exposure Contact -->
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
                :options="barOptionsContact"/>
            </div>
          </v-card-text> 

          <!-- Start Exposure Cadre -->

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
                :options="barOptionsCadre"/>
            </div>
          </v-card-text>
           <!-- Start Exposure Month -->
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
                      :options="barOptionsMonth"/>
                  </div>
          </v-card-text>
          <!-- Start Exposure Gender -->


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
                :options="barOptionsGender"/>
            </div>
          </v-card-text>

          <!-- Start Exposure Age -->

          <v-card-text v-if="n===6">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsAge"/>
            </div>
          </v-card-text>

          <!-- Start Exposure IPC Training -->
          <v-card-text v-if="n===7">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsIpc"/>
            </div>
          </v-card-text>

          <!-- Start PPE's Present -->
          <v-card-text v-if="n===8">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsPpePresent"/>
            </div>
          </v-card-text>

          <!-- Start Specific PPE's -->
          <v-card-text v-if="n===9">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsPpe"/>
            </div>
          </v-card-text>

          <!-- Start PCR Test -->
          <v-card-text v-if="n===10">
            <div class="card vld-parent">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                loader="bars"
                color="#007bff"/>
              <highcharts
                ref="barChart"
                :options="barOptionsPCR"/>
            </div>
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

            // by month
        barOptionsMonth: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Year -  Month'
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
          text: 'Covid 19 Exposures Report by Months'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // by hour

      // barOptionsHour: {
      //   xAxis: {
      //     categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ],
      //     title: {
      //       text: 'Hours Range'
      //     }
      //   },
      //   yAxis: {
      //     min: 0,
      //     title: {
      //       text: 'No. of Exposures',
      //       align: 'high'
      //     },
      //     labels: {
      //       overflow: 'justify',
      //       items: [
      //         {
      //           html: '',
      //           style: {
      //             left: '50px',
      //             top: '18px',
      //             color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
      //           }
      //         }
      //       ]
      //     }
      //   },
      //   plotOptions: {
      //     column: {
      //       dataLabels: {
      //         enabled: true
      //       }
      //     }
      //   },
      //   chart: {
      //     type: 'column'
      //   },
      //   title: {
      //     text: 'Covid 19 Exposures Report by Hours'
      //   },
      //   series: [
      //     {
      //       colorByPoint: true,
      //       name: 'Numbers',
      //       data: []
      //     }
      //   ]
      // },

      //by IPC Training
      barOptionsIpc: {
        xAxis: {
          categories: [0, 1],
          title: {
            text: 'HCW IPC Training' 
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures ',
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
        text: 'Covid 19 Exposure by IPC Training'
      },
      series: [
        {
          colorByPoint: true,
          name: 'Numbers',
          data: []
        }
      ]
    }, 
    
    //Report By Contact
      
      barOptionsContact: {
        xAxis: {
          categories: ['Patient', 'Colleague', 'Community', 'Home', 'Unknown'],
          title: {
            text: 'Nature of Contact'
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
          text: 'Covid 19 Exposures Report by Contact'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // by cadre
      barOptionsCadre: {
        xAxis: {
          categories: ['Cleaner', 'Clinical officer', 'Doctor', 'Laboratory Technologist', 'Nurse', 'Other-Specify', 'Student', 'VCT Counsellor', 'Waste Handler'],
          title: {
            text: 'Cadre'
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
          text: 'Covid 19 Exposures by Cadre'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // by gender
      barOptionsGender: {
        xAxis: {
          categories: ['MALE', 'FEMALE', 'UNDEFINED'],
          title: {
            text: 'Gender'
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
          text: 'Covid 19 Exposure by Gender'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: [],
           
          }
        ]
      },

      // by age group
      barOptionsAge: {
        xAxis: {
          categories: ['18 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
          title: {
            text: 'Age Groups'
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
          text: 'Covid 19 Exposures by Age'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

       //by PPE Present
      barOptionsPpePresent: {
        xAxis: {
          categories: [0, 1],
          title: {
            text: 'HCW With PPES' 
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposures ',
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
        text: 'Covid 19 Exposures Report by PPEs'
      },
      series: [
        {
          colorByPoint: true,
          name: 'Numbers',
          data: []
        }
      ]
    }, 
    
    //Report By PPE Worn
      
      barOptionsPpe: {
        xAxis: {
          categories: ['None', 'Gloves', 'Fabric mask',  'N95 mask (or equivalent)', 'Surgical/medical mask', 'Face shield or goggles/protective glasses', 'Disposable gown', 'Waterproof apron'],
          title: {
            text: 'Types of Personal Protective Equipment'
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
          text: 'Covid 19 Exposures Report by PPEs Worn'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

       //Report By PPE Worn
      
    barOptionsPCR: {
        xAxis: {
          categories: ['Positive', 'Negative', 'Waiting'],
          title: {
            text: 'Nature of Contact'
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
          text: 'Covid 19 Exposures Report by PCR Tests Done'
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

    }
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
              
            } else {
              this.getcovidData(this.s)
            }
          })
          
          .catch(error => console.log(error.message))
      }else if (this.user.role_id === 4) {
        axios.get(`exposures/covid/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.s = exp.data.data
            if (exp.data.links.next != null) {
              this.link = exp.data.links.next
              this.loopT(this.link)
            } else {
              this.getcovidData(this.s)
            }
          })
          .catch(error => console.log(error.message))
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
    
    getcovidData (list) {
      this.load = true
      var data = []
      this.barOptionsMonth.xAxis.categories = this.dateRange(this.startDate, this.endDate)
      for (var i in this.barOptionsMonth.xAxis.categories) {
        data.push(this.getMonthNum(this.barOptionsMonth.xAxis.categories[i], list))
      }
      this.barOptionsMonth.series[0].data = data

      // var data = []
      // for (var i in this.barOptionsHour.xAxis.categories) {
      //   data.push(this.getHourNum(this.barOptionsHour.xAxis.categories[i], list))
      // }
      // this.barOptionsHour.series[0].data = data

      var data = []
      for (var i in this.barOptionsIpc.xAxis.categories) {
        data.push(this.getIPCNum(this.barOptionsIpc.xAxis.categories[i], list))
      }
      this.barOptionsIpc.series[0].data = data

      var data = []
      for (var i in this.barOptionsPpePresent.xAxis.categories) {
        data.push(this.getPpePresent(this.barOptionsPpePresent.xAxis.categories[i], list))
      }
      this.barOptionsPpePresent.series[0].data = data

      var data = []
      for (var i in this.barOptionsPpe.xAxis.categories) {
        data.push(this.getPpe(this.barOptionsPpe.xAxis.categories[i], list))
      }
      this.barOptionsPpe.series[0].data = data

      var data = []
      for (var i in this.barOptionsPCR.xAxis.categories) {
        data.push(this.getPCR(this.barOptionsPCR.xAxis.categories[i], list))
      }
      this.barOptionsPCR.series[0].data = data

      var data = []
      for (var i in this.barOptionsContact.xAxis.categories) {
        data.push(this.getContactNum(this.barOptionsContact.xAxis.categories[i], list))
      }
      this.barOptionsContact.series[0].data = data

      var data = []
      for (var i in this.barOptionsCadre.xAxis.categories) {
        data.push(this.getCadreNum(this.barOptionsCadre.xAxis.categories[i], list))
      }
      this.barOptionsCadre.series[0].data = data

      var data = []
      for (var i in this.barOptionsGender.xAxis.categories) {
        data.push(this.getGenderNum(this.barOptionsGender.xAxis.categories[i], list))
      }
      this.barOptionsGender.series[0].data = data

      var data = []
      for (var i in this.barOptionsAge.xAxis.categories) {
        data.push(this.getAgeNum(i, list))
      }
      this.barOptionsAge.series[0].data = data
      this.value = false
      this.load = false
      this.isLoading = false

    },
    getAgeNum (cat, ag) {
      var count = 0
      for (var x in ag) {
        var date = new Date(ag[x].dob)
        var diff_ms = Date.now() - date.getTime()
        var age_dt = new Date(diff_ms)
        var age = Math.abs(age_dt.getUTCFullYear() - 1970)
        if (age >= 18 && age < 26 && cat == 0) {
          count++
        } else if (age > 25 && age <= 35 && cat == 1) {
          count++
        } else if (age > 35 && age <= 45 && cat == 2) {
          count++
        } else if (age > 45 && age <= 55 && cat == 3) {
          count++
        } else if (age > 55 && age <= 65 && cat == 4) {
          count++
        } else if (age > 65 && cat == 5) {
          count++
        } else if (age < 18 && cat == 6) {
          count++
        } else {
          count
        }
      }
      return count
    },
    getGenderNum (cat, g) {
      var count = 0
      for (var x in g) {
        if (g[x].gender === cat) {
          count++
        }
      }
      return count
    },
    getIPCNum (ipc, c) {
        var counter = 0
        for (var p in c) {
            if (c[p].ipc_training === ipc) {
                counter++
            }
        }
        return counter
    },
    getPpePresent (ppe, c) {
        var counter = 0
        for (var h in c) {
            if (c[h].ppe_worn === ppe) {
                counter++
            }
        }
        return counter
    },
    getPpe (ppes, c) {
        var counter = 0
        for (var g in c) {
            if (c[g].ppes === ppes) {
                counter++
            }
        }
        return counter
    },
    getPCR (pcr, c) {
        var counter = 0
        for (var k in c) {
            if (c[k].pcr_test === pcr) {
                counter++
            }
        }
        return counter
    },
    getCadreNum (name, c) {
        var counter = 0
      for (var xc in c) {
        if (c[xc].cadre === name) {
          counter++
        }
      }
      return counter
    },
    getContactNum (contact, c) {
        var counter = 0
        for (var v in c) {
            if (c[v].contact_with === contact) {
                counter++
            }
        }
        return counter
    },
    getMonthNum (name, expo) {
      var counter = 0
      var c = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      for (var xt in expo) {
        var m = c.indexOf(expo[xt].date_of_contact.slice(0, 3)) + 1 
        if (m < 10) { m = '0' + m }
        var d = [expo[xt].date_of_contact.slice(8, 13).trim(), m].join('-')
        if (d === name) {
          counter++
        }
      }
      return counter
    },
    getHourNum (name, c) {
      var counter = 0
      for (var xh in c) {
        var hr = c[xh].date_of_contact.split(':')[0].slice(-2).trim()

        if (hr < 10) {
          hr = '0' + hr
        }
        if (hr === name) {
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
          dates.push([i, displayMonth].join('-'))
        }
      }
      return dates
    }
  }
}
</script>
