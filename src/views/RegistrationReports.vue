<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 4"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >
              <template>
                <h3>{{ mess2 }}</h3>
                <div
                  v-if="value2" >
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  />
                </div>
                <highcharts
                  ref="barChart"
                  :options="monthOptions"/>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">
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
                :options="cadrOptions"/>
            </template>
          </v-card-text>
          
          <v-card-text v-if="n==3">
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
                :options="barOptions"/>
            </template>
          </v-card-text>

          <v-card-text v-if="n==4">
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
            </template>
          </v-card-text>

        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>
import { Chart } from 'highcharts-vue'
import axios from 'axios'
import VueHighcharts from 'vue2-highcharts'
// import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from 'highcharts'

// SeriesLabel(Highcharts);

export default {
  components: {
    highcharts: Chart,
    VueHighcharts
  },
  data () {
    return {
      value: true,
      value1: true,
      value2: true,

      monthOptions: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Undefined'],
          title: {
            text: 'Monthly Registration'
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
          text: 'Monthly Registration'
        },
        series: [
          {
            name: 'Numbers',
            data: []
          }
        ]
      },
      barOptions: {
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
          text: 'Registration by Gender'
        },
        series: [
          {
            name: 'Numbers',
            data: []
          }
        ]
      },
      cadrOptions: {
        xAxis: {
          categories: ['Doctor', 'Clinical officer', 'Nurse', 'Student', 'Laboratory Technologist', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],
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
          text: 'Registration by Cadre'
        },
        series: [
          {
            name: 'Numbers',
            data: []
          }
        ]
      },
<<<<<<< HEAD
    
=======
      // mess1: 'Fetching Data.....',
      // mess: 'Fetching Data.....',
      // mess2: 'Fetching Data.....',
      s: []
      // date: [],
      // options: data
      // seriesnamet: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
    }
  },

  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      axios.get('hcw')// facility/9831
        .then((exp) => {
          this.s = exp.data.data
          // console.log(exp.data)
          if (exp.data.links.next != null) {
            this.link = exp.data.links.next
            this.loopT(this.link)
          } else {
            console.log('mm')
            this.getAgeData()
          }
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
      console.log(this.s)
      this.getAgeData()
      // this.getTime()
    },

    getAgeData () {
      //
      var data = []
      for (var i in this.barOptions.xAxis.categories) {
        data.push(this.getAgeNum(i))
      }
      this.barOptions.series[0].data = data
<<<<<<< HEAD
     // this.mess = 'Data fetched'
    //  this.value = false
=======
      // this.mess = 'Data fetched'
      this.value = false
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d

      data = []
      for (var i in this.gendOptions.xAxis.categories) {
        data.push(this.getGend(this.gendOptions.xAxis.categories[i]))
      }
      this.gendOptions.series[0].data = data
<<<<<<< HEAD
    // this.mess1 = 'Data fetched'
    // this.value1 = false
=======
      // this.mess1 = 'Data fetched'
      this.value1 = false
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d

      data = []
      for (var i in this.cadrOptions.xAxis.categories) {
        data.push(this.getCadre(this.cadrOptions.xAxis.categories[i]))
      }
      this.cadrOptions.series[0].data = data
<<<<<<< HEAD
    //this.mess1 = 'Data fetched'
      //this.value1 = false

=======
      // this.mess1 = 'Data fetched'
      this.value1 = false
>>>>>>> a40a993f467f74d55336f1e89c3b8d4708d0344d
    },
    getAgeNum (cat) {
      var count = 0
      for (var x in this.s) {
        var date = new Date(this.s[x].dob)
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
          count++
        }
      }
      return count
    },
    getCadre (cat) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].cadre.name === cat) {
          count++
        }
      }
      return count
    }

  }
}
</script>
