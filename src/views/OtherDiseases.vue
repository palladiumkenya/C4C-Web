
<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Measles</v-tab>
      <v-tab>Influenza</v-tab>
      <v-tab>TDAP</v-tab>
      <v-tab>Varicella</v-tab>
      <v-tab>Meningococcal</v-tab>
      <v-tab-item
        v-for="n in 6"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>Other Diseases Summary</h3>
              <highcharts
                ref="columnChart"
                :options="AllDiseaseschartOptions"/>

            </v-flex>
          </v-card-text>

          <v-card-text v-if="n==2">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>Miseasles Summary</h3>
              <highcharts
                ref="columnChart"
                :options="MeaslesChartOptions"/>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==3"> <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>Influenza Summary</h3>
              <highcharts
                ref="columnChart"
                :options="InfluenzaChartOptions"/>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==4">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>TDAP Summary</h3>
              <highcharts
                ref="columnChart"
                :options="TDAPChartOptions"/>

            </v-flex>
          </v-card-text>

          <v-card-text v-if="n==5">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>Varicella Summary</h3>
              <highcharts
                ref="columnChart"
                :options="VaricellaChartOptions"/>

            </v-flex>
          </v-card-text>

          <v-card-text v-if="n==6">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <h3>Meningococcal Summary</h3>
              <highcharts
                ref="columnChart"
                :options="MeningococcalChartOptions" />

            </v-flex>
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
  data () {
    return {
      AllDiseaseschartOptions: {
        xAxis: {
          categories: ['MALE', 'FEMALE' ],
          title: {
            text: 'Disease Immunized against'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of HCWs Immunized',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        chart: {
          height: 700,
          type: 'column'
        },
        title: {
          text: 'Number of HCWs immunized'
        },
        series: [{
          name: ['Measles'],
          data: []
        },
        {
          name: ['Influenza'],
          data: []
        },
        {
          name: ['TDAP'],
          data: []
        },
        {
          name: ['Vericella'],
          data: []
        },
        {
          name: ['Meningococcal'],
          data: []
        }
        ]
      },

      MeningococcalChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations|Meningococcal'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
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
            name: 'Meningococcal Immunizations',
            data: []
          }

        ]
      },

      VaricellaChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations|Varicella'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
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
            name: 'Varicella Immunizations',
            data: []
          }

        ]
      },

      TDAPChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations|TDAP'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
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
            name: 'TDAP Immunizations',
            data: []
          }

        ]
      },

      InfluenzaChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations|Inlfuenza'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
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
            name: 'Influenza Immunizations',
            data: []
          }

        ]
      },

      MeaslesChartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Immunizations|Measles'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
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
            name: 'Measles Immunizations',
            data: []
          }

        ]
      },
      seriesname: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      measles: [],
      influenza: [],
      tdap: [],
      meningococcal: [],
      varicella: [],
      disease: [],
      gender: []
    }
  },
  created () {
    this.getImmunizationsM()
    this.getImmunizationsI()
    this.getImmunizationsT()
    this.getImmunizationsN()
    this.getImmunizationsV()
    this.getAllImmunizations()
  },
  methods: {
    getAllImmunizations () {
      axios.get('immunizations/all')
        .then((exp) => {
          console.log(exp)
          this.a = exp.data.data
          this.link = exp.data.links.next
          this.loopA(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getImmunizationsM () {
      axios.get('immunizations/all/disease/4')
        .then((exp) => {
          console.log(exp)
          this.s = exp.data.data
          this.link = exp.data.links.next
          this.loopT(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getImmunizationsI () {
      axios.get('immunizations/all/disease/2')
        .then((exp) => {
          console.log(exp)
          this.i = exp.data.data
          this.link = exp.data.links.next
          this.loopI(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getImmunizationsT () {
      axios.get('immunizations/all/disease/3')
        .then((exp) => {
          console.log(exp)
          this.t = exp.data.data
          this.link = exp.data.links.next
          this.loopTD(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getImmunizationsN () {
      axios.get('immunizations/all/disease/5')
        .then((exp) => {
          console.log(exp)
          this.n = exp.data.data
          this.link = exp.data.links.next
          this.loopN(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getImmunizationsV () {
      axios.get('immunizations/all/disease/6')
        .then((exp) => {
          console.log(exp)
          this.v = exp.data.data
          this.link = exp.data.links.next
          this.loopV(this.link)
        })
        .catch(error => console.log(error.message))
    },
    getAllDiseases () {
      var count = 0
      for (var i in this.AllDiseaseschartOptions.series) {
        this.seriesdata = []
        for (var v in this.AllDiseaseschartOptions.xAxis.categories) {
          this.seriesdata.push(this.getNumAll(this.AllDiseaseschartOptions.xAxis.categories[v], this.AllDiseaseschartOptions.series[i].name[0]))
          count += this.getNumAll(this.AllDiseaseschartOptions.xAxis.categories[v], this.AllDiseaseschartOptions.series[i].name[0])
        }
        this.AllDiseaseschartOptions.series[i].data = this.seriesdata
      }
    },
    getMeasles () {
      var counter = 0
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNum(this.seriesname[vac]))
        counter += this.getNum(this.seriesname[vac])
        this.measles.push(this.seriesdata)
        console.log('l')
        console.log(this.seriesdata)
      }
      this.MeaslesChartOptions.series[0].data = this.measles
    },
    getInfluenza () {
      var counter = 0
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNumi(this.seriesname[vac]))
        counter += this.getNumi(this.seriesname[vac])
        this.influenza.push(this.seriesdata)
      }
      this.InfluenzaChartOptions.series[0].data = this.influenza
    },
    getTDAP () {
      var counter = 0
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNumt(this.seriesname[vac]))
        counter += this.getNumt(this.seriesname[vac])
        this.tdap.push(this.seriesdata)
      }
      this.TDAPChartOptions.series[0].data = this.tdap
    },
    getVaricella () {
      var counter = 0
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNumv(this.seriesname[vac]))
        counter += this.getNumv(this.seriesname[vac])
        this.varicella.push(this.seriesdata)
      }
      this.VaricellaChartOptions.series[0].data = this.varicella
    },
    getMeningococcal () {
      var counter = 0
      for (var vac in this.seriesname) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesname[vac])
        this.seriesdata.push(this.getNumn(this.seriesname[vac]))
        counter += this.getNumn(this.seriesname[vac])
        this.meningococcal.push(this.seriesdata)
      }
      this.MeningococcalChartOptions.series[0].data = this.meningococcal
    },

    getNumAll (gender, disease) {
      var count = 0
      for (var x in this.a) {
        // console.log(this.s[x].type)
        if (this.a[x].gender === gender && this.a[x].disease === disease) {
          count++
        }
      }
      return count
    },

    getNum (name) {
      var counter = 0
      for (var xo in this.s) {
        if (this.s[xo].date.slice(0, 3) === name) {
          counter++
          console.log(this.s[xo].date.slice(0, 3))
        }
      }
      return counter
    },

    getNumi (name) {
      var counter = 0
      for (var xo in this.i) {
        if (this.i[xo].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumt (name) {
      var counter = 0
      for (var xo in this.t) {
        if (this.t[xo].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    getNumn (name) {
      var counter = 0
      for (var xo in this.n) {
        if (this.n[xo].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },
    getNumv (name) {
      var counter = 0
      for (var xo in this.v) {
        if (this.v[xo].date.slice(0, 3) === name) {
          counter++
        }
      }
      return counter
    },

    async loopA (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.a = this.a.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.getAllDiseases()
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
      this.getMeasles()
    },

    async loopI (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.i = this.i.concat(response.data.data)
        } else {
          i = 11
        }
      }

      this.getInfluenza()
    },

    async loopTD (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next

          this.t = this.t.concat(response.data.data)
        } else {
          i = 11
        }
      }

      this.getTDAP()
    },

    async loopN (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next

          this.n = this.n.concat(response.data.data)
        } else {
          i = 11
        }
      }

      this.getMeningococcal()
    },

    async loopV (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next

          this.v = this.v.concat(response.data.data)
        } else {
          i = 11
        }
      }

      this.getVaricella()
    }
  }
}
// end
</script>
