<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Type</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Device</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Hours</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 9"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
<<<<<<< HEAD
            <!-- Start filters -->

               <core-filters/>
                <v-flex
          md6
          lg12
        >
          <v-btn
            :loading="loading2"
            :disabled="loading2"
            block
            color="success"
            @click="loader = 'loading2'"
          >
            Filter
            <template v-slot:loader/>
          </v-btn>
        </v-flex>
            <!-- End filters -->
=======
            <!-- Start Graphs -->
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d

            <v-layout wrap>
              <v-flex
                lg4
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="blue"
                      @click="handleDownload">
                      CSV
                    </v-btn>
                  </v-flex>

                </v-layout>

                <v-data-table
                  :headers="headers"
                  :items="cadres"

                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                >
                  <template
                    slot="items"
                    slot-scope="props">
                    <tr>
                      <td>{{ props.item.name }}</td>
                      <td>{{ cadreCount }}</td>
                    </tr>
                  </template>

                </v-data-table>
              </v-flex>
              <br>
              <v-flex
                lg8
              >
                <highcharts
                  ref="barChart"
                  :options="barOptionsTime"/>

              </v-flex>
            </v-layout>
          </v-card-text>

          <!-- Start Exposure Type -->
<<<<<<< HEAD


          <v-card-text v-if="n==2">
            <highcharts
              ref="barChart"
              :options="barOptions"/>
            <template>
              <template>
                <v-flex
                  lg8
                >
                  <v-layout wrap>
                    <v-flex
                      xs12
                      md3>
                      <v-btn
                        :loading="downloadLoading"
                        color="primary"
                        @click="handleDownload">
                        Excel
                      </v-btn>
                    </v-flex>
                    <br>
                    <v-flex
                      xs12
                      md3>
                      <v-btn
                        :loading="downloadLoading"
                        color="green"
                        @click="handleDownload">
                        PDF
                      </v-btn>
                    </v-flex>

                    <v-flex
                      xs12
                      md3>
                      <v-btn
                        :loading="downloadLoading"
                        color="blue"
                        @click="handleDownload">
                        CSV
                      </v-btn>
                    </v-flex>

                  </v-layout>

                  <v-data-table
                    :headers="types"
                    :items="exposure_type"

                    :search="search"
                    :rows-per-page-items="rowsPerPageItems"
                  >
                    <template
                      slot="items"
                      slot-scope="props">
                      <tr>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.previous_exposures }}</td>
                      </tr>
                    </template>

                  </v-data-table>
                </v-flex>
              </template>
            </template>
          </v-card-text>

          <!-- Start Exposure Location -->
          

          <v-card-text v-if="n==3">
        
            <highcharts
              ref="barChart"
              :options="barOptionsLocation"/>
            <template>
              <v-flex
                lg8
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="blue"
                      @click="handleDownload">
                      CSV
                    </v-btn>
                  </v-flex>

                </v-layout>

                <v-data-table
                  :headers="locations"
                  :items="cadres"

                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                >
                  <template
                    slot="items"
                    slot-scope="props">
                    <tr>
                      <td>{{ props.item.name }}</td>
                      <td>{{ props.item.previous_exposures }}</td>
                    </tr>
                  </template>

                </v-data-table>
              </v-flex>
            </template>

          </v-card-text>

          <!-- Start Exposure Devices -->

          <v-card-text v-if="n==4">

    
=======

          <v-card-text v-if="n==2">
            <v-layout wrap>
              <v-flex
                lg4
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="blue"
                      @click="handleDownload">
                      CSV
                    </v-btn>
                  </v-flex>

                </v-layout>

                <v-data-table
                  :headers="types"
                  :items="cadres"

                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                >
                  <template
                    slot="items"
                    slot-scope="props">
                    <tr>
                      <td>{{ props.item.exposure_type }}</td>
                      <td>{{ props.item.previous_exposures }}</td>
                    </tr>
                  </template>

                </v-data-table>
              </v-flex>
              <v-flex
                lg
                8>

                <highcharts
                  ref="barChart"
                  :options="barOptions"/>
              </v-flex>
            </v-layout>
          </v-card-text>

          <!-- Start Exposure Location -->

          <v-card-text v-if="n==3">
            <highcharts
              ref="barChart"
              :options="barOptionsLocation"/>
          </v-card-text>

          <!-- Start Exposure Devices -->

          <v-card-text v-if="n==4">
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
            <highcharts
              ref="barChart"
              :options="barOptionsDevice"/>
          </v-card-text>

          <!-- Start Exposure Cadre -->

          <v-card-text v-if="n==5">

<<<<<<< HEAD

            <div
              v-if="valuec" />
            <highcharts
              ref="barChart"
              :options="barOptionsCadre"/>

            <template>
              <v-flex
                lg8
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

=======
            <v-layout wrap>
              <v-flex
                lg4
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="blue"
                      @click="handleDownload">
                      CSV
                    </v-btn>
                  </v-flex>

                </v-layout>

                <v-data-table
                  :headers="headers"
                  :items="cadres"

                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                >
                  <template
                    slot="items"
                    slot-scope="props">
                    <tr>
                      <td>{{ props.item.name }}</td>
                      <td>{{ props.item.previous_exposures }}</td>
                    </tr>
                  </template>

                </v-data-table>
              </v-flex>
<<<<<<< HEAD
            </template>
=======
              <v-flex
                md
                8>
                <div
                  v-if="valuec" />
                <highcharts
                  ref="barChart"
                  :options="barOptionsCadre"/>
              </v-flex>

            </v-layout>
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          </v-card-text>

          <!-- Start Exposure Time -->

          <v-card-text v-if="n==6">

            <highcharts
              ref="barChart"
              :options="barOptionsTime"/>
          </v-card-text>

          <!--Start Exposure Age -->

          <v-card-text v-if="n==7">
<<<<<<< HEAD
      
=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
            <template>
              <h3>{{ mess }}</h3>
              <div
                v-if="value" >
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                />
              </div>
              <highcharts
                ref="barChart"
                :options="barOptionsAge"/>
            </template>

          </v-card-text>

          <!-- Start Exposure Hour -->

          <v-card-text v-if="n==8">
            <highcharts
              ref="barChart"
              :options="barOptionsHour"/>
          </v-card-text>

          <!-- Start Gender -->
          <v-card-text v-if="n==9">

<<<<<<< HEAD
            <!-- Start filters -->

               <core-filters/>
                <v-flex
          md6
          lg12
        >
          <v-btn
            :loading="loading2"
            :disabled="loading2"
            block
            color="success"
            @click="loader = 'loading2'"
          >
            Filter
            <template v-slot:loader/>
          </v-btn>
        </v-flex>
            <!-- End filters -->

=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
            <template>
              <h3>{{ mess1 }}</h3>
              <div
                v-if="value1" >
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                />
              </div>
              <highcharts
                ref="barChart"
                :options="gendOptions"/>
<<<<<<< HEAD
            </template>

                        <template>
              <v-flex
                lg8
                align center
              >
                <v-layout wrap>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="primary"
                      @click="handleDownload">
                      Excel
                    </v-btn>
                  </v-flex>
                  <br>
                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="green"
                      @click="handleDownload">
                      PDF
                    </v-btn>
                  </v-flex>

                  <v-flex
                    xs12
                    md3>
                    <v-btn
                      :loading="downloadLoading"
                      color="blue"
                      @click="handleDownload">
                      CSV
                    </v-btn>
                  </v-flex>

                </v-layout>

                <v-data-table
                  :headers="genders"
                  :items="gend"

                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                >
                  <template
                    slot="items"
                    slot-scope="props">
                    <tr>
                      <td>{{  }}</td>
                      <td>{{ props.item.previous_exposures }}</td>
                    </tr>
                  </template>

                </v-data-table>
              </v-flex>
=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
            </template>


          </v-card-text>
          <v-card-text v-if="n==10">This is the Third tab</v-card-text>
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
<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
=======
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import Exposure_by_time from './Exposure_by_time'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
import json from '../map.json'

// SeriesLabel(Highcharts);
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
  // eslint-disable-next-line vue/order-in-components
  components: {
<<<<<<< HEAD
=======
    Exposure_by_time,
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
    highcharts: Chart
  },
  // eslint-disable-next-line vue/order-in-components
  data () {
    return {

      // cadre
      rowsPerPageItems: [50],
      search: '',
      link: '',
      output: [],
      headers: [
        {
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Number Exposed',
<<<<<<< HEAD
          value: ''
=======
          value: 'previous_exposures'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        }
      ],
      footer: [
        {
          text: 'Total'
        }
      ],

      // Type
      types: [
        {
          text: 'Exposure Type',
          value: 'new_exposures'
        },
        {
          sortable: false,
          text: 'Number Exposed',
          value: 'previous_exposures'
        }
<<<<<<< HEAD
      ],
      // Location
      location: [
        {
          text: 'Exposure Location',
          value: 'new_exposures'
        },
        {
          sortable: false,
          text: 'Number Exposed',
          value: 'previous_exposures'
        }
      ],
      //gender
      genders: [
        {
          text: 'Gender',
          value: 'gender'
        },
        {
          sortable: false,
          text: 'Number Exposed',
          value: ''
        }
      ],
      gend: [
        {
          name: 'Male'
        },
              {
          name: 'Female'
        }
      ],
=======
      ],
      footer: [
        {
          text: 'Total'
        }
      ],
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d

      value: true,
      value1: true,
      valuec: true,

      barOptionsSummary: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Total Health Care Worker Exposure Trends'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Exposed Health Care Workers',
            align: 'high'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
              name: 'Exposures',
              data: []
<<<<<<< HEAD
            }

          ]
        }
      },

      gendOptions: {
        xAxis: {
          categories: ['MALE', 'FEMALE', 'UNDEFINED'],
          title: {
            text: 'Gender'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
          text: 'Exposure by Gender'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },
      // devices starts

      barOptionsDevice: {
        xAxis: {
          categories: ['Syringe/ Needle IM/ SC Injection', 'Syringe/Needle Blood Drawing', 'Phlebotomy needle/vacuum set', 'IV catheter/canula', 'Needle IV Line', 'Unused Needle', 'Lancet', 'Sature Needle', 'Scalpel', 'Capillary Tube', 'Glass Slide', 'Pippete Tip', 'Thermal Gun', 'Scapel', 'Canular', 'Syringe Regular', 'Test', 'Test Syringe', 'Other'],
          title: {
            text: 'Devices'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
          text: 'Exposures by Devices'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // devices ends

      barOptionsAge: {
        xAxis: {
          categories: ['18 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
          title: {
            text: 'Age Groups'
=======
            }

          ]
        }
      },

      gendOptions: {
        xAxis: {
          categories: ['MALE', 'FEMALE', 'UNDEFINED'],
          title: {
            text: 'Gender'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
<<<<<<< HEAD
          text: 'Exposures by Age'
=======
          text: 'Exposure by Gender'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },
<<<<<<< HEAD

      // stats
      barOptionsHour: {
        xAxis: {
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ],
          title: {
            text: 'Hours Range'
=======
      // devices starts

      barOptionsDevice: {
        xAxis: {
          categories: ['Syringe/ Needle IM/ SC Injection', 'Syringe/Needle Blood Drawing', 'Phlebotomy needle/vacuum set', 'IV catheter/canula', 'Needle IV Line', 'Unused Needle', 'Lancet', 'Sature Needle', 'Scalpel', 'Capillary Tube', 'Glass Slide', 'Pippete Tip', 'Thermal Gun', 'Scapel', 'Canular', 'Syringe Regular', 'Test', 'Test Syringe', 'Other'],
          title: {
            text: 'Devices'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
<<<<<<< HEAD
          text: 'Exposures by Hours'
=======
          text: 'Exposures by Devices'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

<<<<<<< HEAD
      // ends

      barOptionsTime: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Months Range'
=======
      // devices ends

      barOptionsAge: {
        xAxis: {
          categories: ['18 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above', 'undefined'],
          title: {
            text: 'Age Groups'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
<<<<<<< HEAD
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Months'
        },
=======
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Age'
        },
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

<<<<<<< HEAD
      barOptionsCadre: {
        xAxis: {
          categories: ['Nurse', 'Clinical officer', 'Doctor', 'Laboratory Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],
          title: {
            text: 'Cadre'
=======
      // stats
      barOptionsHour: {
        xAxis: {
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ],
          title: {
            text: 'Hours Range'
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
<<<<<<< HEAD
=======
          text: 'Exposures by Hours'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      // ends

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
            text: 'Health Care Workers',
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
          text: 'Exposures by Months'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptionsCadre: {
        xAxis: {
          categories: ['Nurse', 'Clinical officer', 'Doctor', 'Laboratory Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],
          title: {
            text: 'Cadre'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          text: 'Exposures by Cadre'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptions: {
        xAxis: {
          categories: ['Prick', 'Cuts', 'Spill', 'fluid spill', 'Bite', 'Needle stick injury', 'Human Bite', 'Needle prick', 'Splash on Mucosa', 'Non-intsact skin', 'Other', 'Etc', 'Not Specified'],
          title: {
            text: 'Exposure Type'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
          text: 'Exposures by Type'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      barOptionsLocation: {
        xAxis: {
          categories: ['Medical ward', 'Surgical ward', 'Theatre', 'Maternity', 'Dental clinic', 'OP/MCH', 'Laundry', 'Laboratory', 'Other'],
          title: {
            text: 'Exposure Location'
<<<<<<< HEAD
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
=======
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Health Care Workers',
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
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        chart: {
          type: 'column'
        },
        title: {
          text: 'Exposures by Location'
        },
        series: [
          {
            colorByPoint: true,
            name: 'Numbers',
            data: []
          }
        ]
      },

      pieOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
<<<<<<< HEAD
        },
        title: {
          text: 'Exposures By Location in Facility'
        },
=======
        },
        title: {
          text: 'Exposures By Location in Facility'
        },
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        subtitle: {
          text: 'by location'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
<<<<<<< HEAD
          }
        },
        series: [
          {
            name: 'Exposures Count',
            data: []
          }
=======
          }
        },
        series: [
          {
            name: 'Exposures Count',
            data: []
          }
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        ]
      },

      cadreDoc: 0,
      s: [],
      locations: [],
      hcw: [],
      type: [],
      cadre: [],
      dob: [],
      date: [],
      users: [],
      gender: [],
      hours: [],

      seriesname: ['Theater', 'Theater', 'Theater'],
      seriesdata: []

    }
  },

  created () {
    this.getExp()
    this.getCad()
    // this.getExpo()
  },
  methods: {

    getSum () {
      var counter = 0
      for (var vac in this.seriesnamesum) {
        this.seriesdatasum = []
        this.seriesdatasum.push(this.seriesnamesum[vac])
        this.seriesdatasum.push(this.getNumsum(this.seriesnamesum[vac]))
        counter += this.getNumsum(this.seriesnamesum[vac])
        this.date.push(this.seriesdatasum)
      }
      this.barOptionsSummary.series[0].data = this.date
    },
    getDep () {
      // eslint-disable-next-line no-unused-vars
      var count = 0
      for (var v in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[v])
        this.seriesdata.push(this.getNum(this.seriesname[v]))
        count += this.getNum(this.seriesname[v])
        this.locations.push(this.seriesdata)
      }
      this.pieOptions.series[0].data = this.locations
    },
    //  getTypes () {
    //   var counter = 0
    //   for (var va in this.seriesnames) {
    ///   this.seriesdatas = []
    //  this.seriesdatas.push(this.seriesnames[va])
    //  this.seriesdatas.push(this.getNums(this.seriesnames[va]))
    // counter += this.getNums(this.seriesnames[va])
    //  this.type.push(this.seriesdatas)
    // }
    // this.barOptions.series[0].data = this.type
    //  },

    getExp () {
      axios.get('exposures/all/')
        .then((exp) => {
          this.s = exp.data.data
          if (exp.data.links.next != null) {
            this.link = exp.data.links.next
            // this.c = exp.data.cadre.meta.total // total cadre
            this.loopT(this.link)
          } else {
            this.getAgeData()
          }
          console.log(exp.data.data)
        })
        .catch(error => console.log(error.message))
        .then((exp) => {
          this.s = exp.data.data
          this.link = exp.data.links.next
          this.loopT(this.link)
        })
        .catch(error => console.log(error.message))
    },

    getCad () {
      axios.get('cadres')
        .then((cad) => {
          this.cadres = cad.data.data
          // this.link = cad.data.links.next
          // this.loopT(this.link)
          console.log(cad.data.data)
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
        } else {
          i = 11
        }
      }
      this.getDep()
      this.getAgeData()
      this.getSum()
    },

    getAgeData () {
      //
      var data = []
      for (var i in this.barOptionsAge.xAxis.categories) {
        data.push(this.getAgeNum(i))
      }
      this.barOptionsAge.series[0].data = data
      this.value = false

<<<<<<< HEAD
      var datag = []
      for (var i in this.gendOptions.xAxis.categories) {
        datag.push(this.getGend(this.gendOptions.xAxis.categories[i]))
=======
      var data = []
      for (var i in this.gendOptions.xAxis.categories) {
        data.push(this.getGend(this.gendOptions.xAxis.categories[i]))
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
      }
      this.gendOptions.series[0].data = datag
      this.value1 = false

<<<<<<< HEAD
      var datad = []
      for (var i in this.barOptionsDevice.xAxis.categories) {
        datad.push(this.getDevice(this.barOptionsDevice.xAxis.categories[i]))
      }
      this.barOptionsDevice.series[0].data = datad
=======
      var data = []
      for (var i in this.barOptionsDevice.xAxis.categories) {
        data.push(this.getDevice(this.barOptionsDevice.xAxis.categories[i]))
      }
      this.barOptionsDevice.series[0].data = data
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
      // this.value1 = false

      var datac = []
      for (var i in this.barOptionsCadre.xAxis.categories) {
        datac.push(this.getNumc(this.barOptionsCadre.xAxis.categories[i]))
      }
      this.barOptionsCadre.series[0].data = datac
      // this.valuec = false

<<<<<<< HEAD
      var datal = []
      for (var i in this.barOptionsLocation.xAxis.categories) {
        datal.push(this.getNum(this.barOptionsLocation.xAxis.categories[i]))
      }
      this.barOptionsLocation.series[0].data = datal

      var datas = []
      for (var i in this.barOptions.xAxis.categories) {
        datas.push(this.getNums(this.barOptions.xAxis.categories[i]))
      }
      this.barOptions.series[0].data = datas
      this.valuet = false

      var datah = []
      for (var i in this.barOptionsHour.xAxis.categories) {
        datah.push(this.getNumh(this.barOptionsHour.xAxis.categories[i]))
      }
      this.barOptionsHour.series[0].data = datah

      var datat = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        datat.push(this.getNumt(this.barOptionsTime.xAxis.categories[i]))
      }
      this.barOptionsTime.series[0].data = datat
=======
      var data = []
      for (var i in this.barOptionsLocation.xAxis.categories) {
        data.push(this.getNum(this.barOptionsLocation.xAxis.categories[i]))
      }
      this.barOptionsLocation.series[0].data = data

      var data = []
      for (var i in this.barOptions.xAxis.categories) {
        data.push(this.getNums(this.barOptions.xAxis.categories[i]))
      }
      this.barOptions.series[0].data = data
      this.valuet = false

      var data = []
      for (var i in this.barOptionsHour.xAxis.categories) {
        data.push(this.getNumh(this.barOptionsHour.xAxis.categories[i]))
      }
      this.barOptionsHour.series[0].data = data

      var data = []
      for (var i in this.barOptionsTime.xAxis.categories) {
        data.push(this.getNumt(this.barOptionsTime.xAxis.categories[i]))
      }
      this.barOptionsTime.series[0].data = data
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
    },
    getAgeNum (cat) {
      var count = 0
      for (var x in this.s) {
        var date = new Date(this.s[x].dob)
<<<<<<< HEAD
        // eslint-disable-next-line camelcase
=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
        var diff_ms = Date.now() - date.getTime()
        var age_dt = new Date(diff_ms)
        var age = Math.abs(age_dt.getUTCFullYear() - 1970)
        if (age < 26 && cat == 0) {
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
        } else {
          count
        }
      }
      return count
    },
    getGend (cat) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].gender === cat) {
<<<<<<< HEAD
          console.log()
=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
          count++
        }
      }
      return count
    },
    getGp (cat, num) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].gender === cat && this.s[x].gender === num) {
          count++
           console.log((count / 100 ) * (cat + num))
        }
      }

    },

<<<<<<< HEAD

=======
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
    getDevice (cat) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].device_used === cat) {
          count++
        }
      }
      return count
    },
    getNum (name) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].exposure_location === name) {
          count++
        }
      }
      return count
    },
    getNums (cat) {
      var counter = 0
      for (var xo in this.s) {
        if (this.s[xo].exposure_type === cat) {
          counter++
        }
      }
      return counter
    },
    getNumc (name) {
      var counter = 0
      for (var xc in this.s) {
        if (this.s[xc].cadre === name) {
          counter++
        }
      }
      return counter
    },
    getNumt (name) {
      var counter = 0
      for (var xt in this.s) {
        if (this.s[xt].exposure_date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumsum (name) {
      var counter = 0
      for (var xsum in this.s) {
        if (this.s[xsum].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumh (name) {
      var counter = 0
      for (var xh in this.s) {
        if (moment(this.s[xh].created_at).format().substr(11, 2) === name) {
          console.log('l')
          // console.log(moment(this.s[xh].created_at).format('LT'))
          counter++
        }
      }
      return counter
    }
  }
}
</script>
