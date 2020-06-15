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
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Hour</v-tab>
      <v-tab>Report By Contact</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab-item
        v-for="n in 6"
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

          <!-- Start Exposure Hour -->
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
                :options="barOptionsHour"/>
            </div>
          </v-card-text>

          <!-- Start Exposure Contact -->

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
                :options="barOptionsContact"/>
            </div>
          </v-card-text>

          <!-- Start Exposure Cadre -->

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
                :options="barOptionsCadre"/>
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

      barOptionsHour: {
        xAxis: {
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ],
          title: {
            text: 'Hours Range'
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
          text: 'Covid 19 Exposures Report by Hours'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },
      // by contact

      barOptionsContact: {
        xAxis: {
          categories: ['Patient', 'Colleague', 'Community', 'Home', 'Unknown'],
          title: {
            text: 'Contact With'
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

        }
    },

    created () {
    },

    methods: {

    getcovidExpo () {
        axios.get('')
          .then((response) => {
              this.covid = response.data.data
          })
          .catch(error => console.log(error.message))
    },
     async loopT (l) {
      var i; var u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.covid = this.covid.concat(response.data.data)
        } else {
          i = 11
        }
      }
      if (this.user.role_id === 5) {
        this.active = false
        for (var i in this.s) {
          if (this.covid[i].county == this.user.county) {
            u.push(this.s[i])
          }
        }
        this.covid = u
      }
      //this.getAgeData(this.s)
      this.isLoading = false
    },
    getcovidData (list) {
        this.load = true
      var data = []
      for (var i in this.barOptionsMonth.xAxis.categories) {
        data.push(this.getMonthNum(i, list))
      }
      this.barOptionsMonth.series[0].data = data
      this.value = false
      this.load = false

      this.load = true
      var data = []
      for (var i in this.barOptionsHour.xAxis.categories) {
        data.push(this.getHourNum(i, list))
      }
      this.barOptionsHour.series[0].data = data
      this.value = false
      this.load = false

      this.load = true
      var data = []
      for (var i in this.barOptionsContact.xAxis.categories) {
        data.push(this.getContactNum(i, list))
      }
      this.barOptionsContact.series[0].data = data
      this.value = false
      this.load = false

      this.load = true
      var data = []
      for (var i in this.barOptionsCadre.xAxis.categories) {
        data.push(this.getCadreNum(i, list))
      }
      this.barOptionsCadre.series[0].data = data
      this.value = false
      this.load = false

      this.load = true
      var data = []
      for (var i in this.barOptionsGender.xAxis.categories) {
        data.push(this.getGenderNum(i, list))
      }
      this.barOptionsGender.series[0].data = data
      this.value = false
      this.load = false

      this.load = true
      var data = []
      for (var i in this.barOptionsAge.xAxis.categories) {
        data.push(this.getAgeNum(i, list))
      }
      this.barOptionsAge.series[0].data = data
      this.value = false
      this.load = false

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
    getMonthNum (month, m) {
      var counter = 0
      var c = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      for (var k in m) {
        var a = c.indexOf(m[xt].date_of_contact.slice(0, 3)) + 1 
        if (a < 10) { a = '0' + a }
        var d = [m[xt].date_of_contact.slice(8, 13).trim(), a].join('-')
        if (d === month) {
          counter++
        }
      }
      return counter
    },
    getHourNum (name, t) {
      var counter = 0
      for (var xh in t) {
        var hr = t[xh].exposure_date.split(':')[0].slice(-2).trim()

        if (hr < 10) {
          hr = '0' + hr
        }
        if (hr === name) {
          counter++
        }
      }
      return counter
    },
  }
}
</script>