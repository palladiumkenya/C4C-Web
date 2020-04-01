<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Type</v-tab>
      <v-tab>Report By Time</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Hours</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 8"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <highcharts
              ref="pieChart"
              :options="pieOptions"/>
            <v-flex
              md12
              sm12
              lg12
            >

              <select>
                <option>County</option>
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
                <option>Lamu</option>
                <option>Kwale</option>
              </select>

              &nbsp;
              <select>
                <option>Sub-county</option>
                <option/>
              </select>
              &nbsp;&nbsp;&nbsp;
              <select>
                <option>Facility</option>
                <option/>
              </select>
              &nbsp;&nbsp;&nbsp;
              <select>
                <option>Partner</option>
              </select>

              <template>
                <section class="charts">
                  <highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">This is the second tab</v-card-text>
          <v-card-text v-if="n==3">This is the Third tab</v-card-text>
          <v-card-text v-if="n==4">This is the Third tab</v-card-text>
          <v-card-text v-if="n==5">This is the Third tab</v-card-text>
          <v-card-text v-if="n==6">This is the Third tab</v-card-text>
          <v-card-text v-if="n==7">This is the Third tab</v-card-text>
          <v-card-text v-if="n==8">This is the Third tab</v-card-text>
          <v-card-text v-if="n==9">This is the Third tab</v-card-text>
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
import { mapGetters } from 'vuex'

// SeriesLabel(Highcharts);
exportingInit(Highcharts)
const datas = 'https://jsonplaceholder.typicode.com/users'
console.log(datas)
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
      type: 'column',
      name: 'Monthly Exposures',
      data: [7, 3, 3, 9, 0, 5, 6, 2, 4, 1, 8, 0]
    }

  ]
}

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  components: {
    highcharts: Chart
  },
  data () {
    return {
      chartType: 'Spline',
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Sin chart'
        }
      },
      options: data,
      pieOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures'
        },
        subtitle: {
          text: 'by location'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: 'Exposures Count',
            data: []
          },
        ]
      },
      cadreDoc: 0,
      s: [],
      locations: [],
      seriesdata: [],
      seriesname: ['Lab','Ward','Theatre','Pharmacy','Corridors','Medical ward','Emergency Room','Surgical ward','Maternity','Dental clinic','Laboratory','Laundry','OP/MCH','Other','Not Specified']

    }
  },
  created ()  {
    this.getExp()
  },
  methods: {
    getDep(){
      var count = 0;
      for(var v in this.seriesname){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesname[v])
        this.seriesdata.push(this.getNum(this.seriesname[v]))
        count += this.getNum(this.seriesname[v])
        this.locations.push(this.seriesdata)
      }
      this.pieOptions.series[0].data = this.locations
    },
    getExp () {
      axios.get('exposures/all/')
      .then((exp) => {
        this.s = exp.data.data
        this.link = exp.data.links.next
        this.loopT(this.link)
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
    },
    getNum(name){
      var count = 0
      for(var x in this.s){
        if (this.s[x].location === name){
          count++
        }
      }
      return count
    }
  }
}
</script>
