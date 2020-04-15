<template>
<highcharts :options="barOptionsCadre" ref="columnChart"/>
</template>


<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Exposure_by_time from "./Exposure_by_time";

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

      barOptionsCadre: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
    text: 'Registration By Cadres'
  },

  xAxis: {
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
      //type: 'column',
      colorByPoint: true,
      name: 'Cadre by Number',
      data: []
    }

  ]
      },

      cadreDoc: 0,
      s: [],
       cadre: [],
        seriesdatac: [],
      seriesnamec: ['Nurse', 'Clinical officer', 'Doctor', 'Lab Technologist', 'Student', 'Cleaner', 'Waste Handler', 'VCT Counsellor', 'Other-Specify'],

    }
  },
  created ()  {
    this.getExp()
  },
  methods: {

    getCadre(){
      var counter = 0;
      for(var vac in this.seriesnamec){
        this.seriesdata=[]
        this.seriesdata.push(this.seriesnamec[vac])
        this.seriesdata.push(this.getNumc(this.seriesnamec[vac]))
        counter += this.getNumc(this.seriesnamec[vac])
        this.cadre.push(this.seriesdata)
      }
      this.barOptionsCadre.series[0].data = this.cadre
    },
    getExp () {
      axios.get('hcw')
      .then((exp) => {
        this.s = exp.data.data
        console.log(this.s)
        console.log(this.s[0].date.slice(0,3))
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


      this.getCadre()

    },

    getNumc(name){
      var counter = 0
      for(var xc in this.s){
        if (this.s[xc].cadre.name === name){
          counter++
        }
      }
      return counter
    },
  }
}
</script>
