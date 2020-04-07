
<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Full Dose</v-tab>
      <v-tab>Partial Dose</v-tab>
      <v-tab>No Dose</v-tab>
      <v-tab-item
        v-for="n in 3"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >
              {{hbvs}}
             <highcharts :options="barOptionsHBV" ref="columnChart"/>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">Partial Dose list</v-card-text>
          <v-card-text v-if="n==3">No dose list</v-card-text>
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
import moment from 'moment'

// SeriesLabel(Highcharts);
exportingInit(Highcharts)


export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  components: {
    highcharts: Chart
  },
  data() {
    return {
      barOptionsHBV: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations by HBV'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          //  categories: ['01', '02', '03', '04', '05','06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00' ]


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
            //type: 'column',
            colorByPoint: true,
            name: 'HBV Immunizations',
            data: []
          }

        ]
      },
      seriesname: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      hbvs: []
    }
  },
created ()  {
    this.getImmunizations()
  this.getDuplicateUsers()
  },
  methods: {
    getImmunizations() {
      axios.get('immunizations/all/disease/1')
              .then((exp) => {
                console.log(exp)
                this.s = exp.data.data
                this.link = exp.data.links.next
                this.loopT(this.link)
              })
              .catch(error => console.log(error.message))
    },
    getHBV() {
      var counter = 0;
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNum(this.seriesname[vac]))
        counter += this.getNum(this.seriesname[vac])
        this.hbvs.push(this.seriesdata)
      }
      this.barOptionsHBV.series[0].data = this.hbvs
    },
    getNum(name) {
      var counter = 0
      for (var xo in this.s) {
        if (this.s[xo].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },
    getDuplicateUsers() {
      var count = {};
      var myarrat = [];
      for (var xo in this.s) {
        myarrat.push(this.s[xo].user_id)

      myarrat.forEach(function (xo) {
        count[xo] = (count[xo] || 0) + 1
      });
      console.log(count)
    }
    },
    async loopT(l) {
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
      this.getHBV()
    }
  }
}

</script>
