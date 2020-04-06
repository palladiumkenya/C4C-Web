<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Type</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Month</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Hours</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 8"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

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

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">
            <highcharts
              ref="columnChart"
              :options="barOptions"/>
          </v-card-text>
          <v-card-text v-if="n==3">
            <highcharts
              ref="pieChart"
              :options="pieOptions"/>
          </v-card-text>
          <v-card-text v-if="n==4">
            <highcharts
              ref="columnChart"
              :options="barOptionsCadre"/>
          </v-card-text>
          <v-card-text v-if="n==5">
            <highcharts
              ref="columnChart"
              :options="barOptionsTime"/>
          </v-card-text>
          <v-card-text v-if="n==6"/>
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
      barOptionsTime: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures By Month'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
          // categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
          }

        ]
      },

      barOptionsCadre: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures By Cadres'
        },
        subtitle: {
          // text: 'by Cadre'
        },
        xAxis: {
          //
          // categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          categories: ['Nurse', 'Clinical officer', 'Doctor', 'Laboratory Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify']

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
            name: 'Exposure Cadres',
            data: []
          }

        ]
      },

      barOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Exposures By Types'
        },
        subtitle: {
        //  text: 'by Type'
        },
        xAxis: {
          //
          // categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          categories: ['Prick', 'Cut', 'Spill', 'fluid spill', 'Bite', 'Needle stick injury', 'Human Bite', 'Needle prick', 'Splash on mucosa', 'Non-intsact skin', 'Other', 'Etc', 'Not Specified']

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
            name: ['Exposure types'],
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
        },
        title: {
          text: 'Exposures By Location in Facility'
        },
        subtitle: {
        //  text: 'by location'
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
          }
        ]
      },
      cadreDoc: 0,
      s: [],
      locations: [],
      type: [],
      cadre: [],
      date: [],
      seriesdata: [],
      seriesname: ['Lab', 'Ward', 'Theatre', 'Pharmacy', 'Corridors', 'Medical ward', 'Emergency Room', 'Surgical ward', 'Maternity', 'Dental clinic', 'Laboratory', 'Laundry', 'OP/MCH', 'Other', 'Not Specified'],
      seriesdatas: [],
      seriesnames: ['Prick', 'Cut', 'Spill', 'fluid spill', 'Bite', 'Needle stick injury', 'Human Bite', 'Needle prick', 'Splash on mucosa', 'Non-intsact skin', 'Other', 'Etc', 'Not Specified'],
      seriesdatac: [],
      seriesnamec: ['Nurse', 'Clinical officer', 'Doctor', 'Lab Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],
      seriesnamet: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  created () {
    this.getExp()
  },
  methods: {
    getDep () {
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
    getTypes () {
      var counter = 0
      for (var va in this.seriesnames) {
        this.seriesdatas = []
        this.seriesdatas.push(this.seriesnames[va])
        this.seriesdatas.push(this.getNums(this.seriesnames[va]))
        counter += this.getNums(this.seriesnames[va])
        this.type.push(this.seriesdatas)
      }
      this.barOptions.series[0].data = this.type
    },
    getCadre () {
      var counter = 0
      for (var vac in this.seriesnamec) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesnamec[vac])
        this.seriesdata.push(this.getNumc(this.seriesnamec[vac]))
        counter += this.getNumc(this.seriesnamec[vac])
        this.cadre.push(this.seriesdata)
      }
      this.barOptionsCadre.series[0].data = this.cadre
    },
    getTime () {
      var counter = 0
      for (var vac in this.seriesnamet) {
        this.seriesdata = []
        this.seriesdata.push(this.seriesnamet[vac])
        this.seriesdata.push(this.getNumt(this.seriesnamet[vac]))
        counter += this.getNumt(this.seriesnamet[vac])
        this.date.push(this.seriesdata)
        console.log(this.seriesdata)
      }
      this.barOptionsTime.series[0].data = this.date
    },
    getExp () {
      axios.get('exposures/all/')
        .then((exp) => {
          this.s = exp.data.data
          console.log(this.s)
          console.log(this.s[0].date.slice(0, 3))
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
      this.getTypes()
      this.getCadre()
      this.getTime()
    },
    getNum (name) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].location === name) {
          count++
        }
      }
      return count
    },
    getNums (name) {
      var counter = 0
      for (var xo in this.s) {
        if (this.s[xo].type === name) {
          counter++
        }
      }
      return counter
    },
    getNumc (name) {
      var counter = 0
      for (var xc in this.s) {
        if (this.s[xc].cadre.name === name) {
          counter++
        }
      }
      return counter
    },
    getNumt (name) {
      var counter = 0
      for (var xt in this.s) {
        if (this.s[xt].date.slice(0, 3) === name) {
          console.log(this.s[xt].date.slice(0, 3))
          counter++
        }
      }
      return counter
    }
  }
}
</script>
