
<template>
  <v-card>
<h3></h3>
              <highcharts
                ref="columnChart"
                :options="barOptionsHBV"/>


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
          categories: ['Dose 3', 'Dose 2', 'Dose 1']
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
            // type: 'column',
            colorByPoint: true,
            name: 'HBV Immunizations',
            data: []
          }

        ]
      },
      seriesname: ['Jan', 'Feb', 'Mar'],
      hbvs: []
    }
  },
  created () {
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
    getHBV () {
      var counter = 0
      this.seriesdata = []
      for (var vac in this.seriesname) {
        this.seriesdata.push(this.getNum(vac))
        console.log(this.seriesdata)
      }
      this.barOptionsHBV.series[0].data = this.seriesdata
    },
    getNum (name) {
      var a = [], b = [], c= [], prev, count = 0
      var arr = this.s
      arr.sort()
      for ( var i = 0; i < arr.length; i++ ) {
          if ( arr[i].user_id !== prev ) {
              a.push(arr[i].user_id)
              b.push(1)
          } else {
              b[b.length-1]++
          }
          prev = arr[i].user_id
      }
      console.log(a +"\n "+ b)
      for (var u in b){
        if (b[u] === 3 && name == 0){
          count++
        } else if (name == 2 ){
          count++
        } else if(name == 1){
          count++
        } else {
          count
        }
      }
      console.log(count)
      return count
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
