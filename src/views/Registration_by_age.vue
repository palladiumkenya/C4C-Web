<template>

  <highcharts
    ref="barChart"
    :options="chartOptions"/>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Exposure_by_time from './Exposure_by_time'

// SeriesLabel(Highcharts);
exportingInit(Highcharts)

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  components: {
    Exposure_by_time,
    highcharts: Chart
  },
  data () {
    return {

      barOptions: {
        xAxis: {
          categories: ['18 - 25', '26 - 35', '26 - 45', '46 - 55', '56 - 65', '65 and Above'],
          title: {
            text: 'Age Difference'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Ages',
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
          text: 'Registration by Age'
        },
        series: [{
          name: [''],
          data: []
        }

        ]
      },
      seriesdata: [],
      s: [],
      u: [],
      b: []
    }
  },
  created () {
    this.getExp()
  },
  methods: {
    getDep () {
      var count = 0
      for (var i in this.chartOptions.series) {
        this.seriesdata = []
        for (var v in this.chartOptions.xAxis.categories) {
          this.seriesdata.push(this.getNum(this.chartOptions.xAxis.categories[v],
            this.chartOptions.series[i].name[0]))
          count += this.getNum(this.chartOptions.xAxis.categories[v],
            this.barOptions.series[i].name[0])
        }
        this.barOptions.series[i].data = this.seriesdata
        console.log(this.seriesdata)
      }

      console.log(count)
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

    getNum (dob) {
      var count = 0
      for (var x in this.s) {
        if (this.s[x].location === dob) {
          console.log(this.s[x].location)
          console.log(this.u.length)
          count++
        }
      }
      return count
    },
    // getting age ranges

    getAge (dateString) {
      var today = new Date()
      var birthDate = new Date(dateString)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      for (var n in this.s) {
        if (this.s[x].dob === datestring && age >= 18 && age <= 25) {
          return age
        } else if (this.s[x].dob === datestring && age >= 26 && age <= 35) {
          return age
        } else if (this.s[x].dob === datestring && age >= 36 && age <= 45) {
          return age
        } else if (this.s[x].dob === datestring && age >= 46 && age <= 55) {
          return age
        } else if (this.s[x].dob === datestring && age >= 56 && age <= 65) {
          return age
        } else if (this.s[x].dob === datestring) {
          return age
        }
      }
    }

  }
}
</script>
