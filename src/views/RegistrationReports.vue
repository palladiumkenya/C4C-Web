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
          item-text="county"
          item-value="id"
          :items="all_counties"
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
          v-model="subcounties"
          item-text="sub_county"
          item-value="subcounty"
          :items="all_subcounties"
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
          disabled
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
          :items="all_facilities_level"
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
import { mapGetters } from 'vuex'

// SeriesLabel(Highcharts);

export default {
  components: {
    highcharts: Chart,
    VueHighcharts
  },
  data () {
    return {
        facility: '',
       counties: '',
       subcounties: '',
      all_facilities: [],
      all_facilities_level: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5 and Above'],
      all_counties: [],
      all_subcounties: [],

    
      value: true,
      value1: true,
      value2: true,

      monthOptions: {
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
      mess1: 'Fetching Data.....',
      mess: 'Fetching Data.....',
      mess2: 'Fetching Data.....',
      s: []
      // date: [],
      // options: data
      // seriesnamet: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },

  created () {
    this.getUsers()
    this.getFacilities()
    this.getCounties()
    this.getSubCounties()
  },
  methods: {

    getCounties () {
      axios.get('counties')
        .then((counties) => {
          console.log(counties.data)
          this.all_counties = counties.data.data
          if (counties.data.links.next != null) {
            this.link = counties.data, links.next
            this.loopT(this.link)
          }
        })
        .catch(error => console.log(error.message))
    },

    getSubCounties () {
      axios.get('subcounties/3')
        .then((subcounties) => {
          console.log(subcounties.data)
          this.all_subcounties = subcounties.data.data
          if (subcounties.data.links.next != null) {
            this.link = subcounties.data, links.next
            this.loopT(this.link)
          }
        })
        .catch(error => console.log(error.message))
    },

     getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
         // this.all_counties = facilities.data.data
          if (facilities.data.links.next != null) {
            this.link = facilities.data, links.next
            this.loopT(this.link)
          }
        })
        .catch(error => console.log(error.message))
    },
    getUsers () {
      if (this.user.role_id === 1) {
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
      } else if (this.user.role_id === 4) {
        axios.get(`hcw/facility/${this.user.hcw.facility_id}`)
          .then((exp) => {
            this.s = exp.data.data
            // console.log(exp.data)
            if (exp.data.links.next != null) {
              this.link = exp.data.links.next
              this.loopT(this.link)
            } else {
      console.log(this.s)
              this.getAgeData()
            }
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
      console.log(this.s)
      this.getAgeData()

      this.getsummarydata()
      // this.getTime()
    },

    getAgeData () {
      //
      var data = []
      for (var i in this.barOptions.xAxis.categories) {
        data.push(this.getAgeNum(i))
      }
      this.barOptions.series[0].data = data

     // this.mess = 'Data fetched'
    //  this.value = false
      // this.mess = 'Data fetched'
      this.value = false

      data = []
      for (var i in this.gendOptions.xAxis.categories) {
        data.push(this.getGend(this.gendOptions.xAxis.categories[i]))
      }
      this.gendOptions.series[0].data = data
      // this.mess1 = 'Data fetched'
      this.value1 = false

      data = []
      for (var i in this.cadrOptions.xAxis.categories) {
        data.push(this.getCadre(this.cadrOptions.xAxis.categories[i]))
      }
      this.cadrOptions.series[0].data = data

    //this.mess1 = 'Data fetched'
      //this.value1 = false

      // this.mess1 = 'Data fetched'
      this.value1 = false
    },

    getsummarydata (){
        var reg = []
      for (var r in this.monthOptionsTest.xAxis.categories) {
        reg.push(this.getNumr(this.monthOptionsTest.xAxis.categories[r]))
        
      }
     this.monthOptions.series[0].data = reg

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
        } else if (cat ==6 && isNaN(age)) {
          count++
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
        if (this.s[x].cadre === cat) {
          count++
        }
      }
      return count

    },

    getNumr (name) {
      var counter = 0
      for (var r in this.userz) {
        var dat = new Date(this.userz[r].updated_at)
        var list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        if (list[dat.getMonth()] === name) {
          console.log(name)
          counter++
        }
      }
      return counter
    },
    }


  }
</script>
