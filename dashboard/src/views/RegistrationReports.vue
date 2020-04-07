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
                <section class="charts">
                  <h3>Registration Visualization</h3>
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">This is the second tab</v-card-text>
          <v-card-text v-if="n==3">
            <template>
              <h3>{{mess}}</h3>
              <div
              v-if="value" >
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
              </div>
              <highcharts :options="barOptions" ref="barChart"/>
            </template>
          </v-card-text>
          <v-card-text v-if="n==4"><Registration_by_gender/></v-card-text>
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
import Registration_by_gender from "./Registration_by_gender";

// SeriesLabel(Highcharts);

const data = {
  title: {
    text: 'Exposures Chart Analysis'
  },
  xAxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  labels: {
    items: [
      {
        html: 'Exposures Per Cadre',
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
      type: 'column',
      name: 'Monthly Exposures',
      data: [7, 3, 3, 9, 0, 5, 6, 2, 4, 1, 8, 0]
    },
    {

    },
    {
      type: 'pie',
      name: 'Number of Exposure:',
      data: [
        {
          name: 'Doctor',
          y: 13,
          color: Highcharts.getOptions().colors[0] // Jane's color
        },
        {
          name: 'Nurse',
          y: 23,
          color: Highcharts.getOptions().colors[1] // John's color
        },
        {
          name: 'Clinical Officer',
          y: 19,
          color: Highcharts.getOptions().colors[2] // Joe's color
        }
      ],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }
  ]
}
export default {
  components: {
    Registration_by_gender,
    highcharts: Chart,
    VueHighcharts
  },
  data () {
    return {
      value: true,
      barOptions: {
        xAxis: {
          categories: ['0 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '65 and Above','undefined'],
          title: {
              text: 'Age Groups'
          }
        },
        yAxis: {
          min: 0,
          title: {
              text: "No. of Ages",
              align: "high"
          },
          labels: {
              overflow: "justify"
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
            name: "Numbers",
            data: []
          },
        ]
      },
      mess: 'Fetching Data.....',
      s: [],
      u: [],
      b: [],
      options: data
    }
  },

  created ()  {
    this.getUsers()
  },
  methods: {
    getUsers () {
      axios.get('hcw')
      .then((exp) => {
        this.s = exp.data.data
        if (exp.data.links.next != null){
          this.link = exp.data.links.next
          this.loopT(this.link)
        }else {
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
      this.getAgeData()
    },
    getAgeData () {
      //
      var data = []
      for (var i in this.barOptions.xAxis.categories){
        console.log(this.barOptions.xAxis.categories[i])
        data.push(this.getAgeNum(i))
      }
      this.barOptions.series[0].data = data
      this.mess = 'Data fetched'
      this.value = false
    },
    getAgeNum (cat) {
      var count = 0
      var co = 0
      for (var x in this.s){
        var date =new Date(this.s[x].dob)
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms);
        var age = Math.abs(age_dt.getUTCFullYear() - 1970)
        //console.log(age)
        if(age<26 && cat == 0){
          // console.log(this.s[x].dob)
          count++
        } else if (age >25 && age <= 35 && cat == 1){
          // console.log(this.s[x].dob)
          count++
        } else if (age >35 && age <= 45 && cat == 2){
          // console.log(this.s[x].dob)
          count++
        } else if (age >45 && age <= 55 && cat == 3){
          // console.log(this.s[x].dob)
          count++
        } else if (age >55 && age <= 65 && cat == 4){
          // console.log(this.s[x].dob)
          count++
        } else if (age > 65 && cat == 5){
          // console.log(this.s[x].dob)
          count++
        } else {
          count
        }
      }
      return count
    }



  }
}
</script>
