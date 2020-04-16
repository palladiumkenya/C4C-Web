<temlate>
    <highcharts :options="barOptions" ref="barChart"/>

</temlate>

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
    data() {
        return {

            value: true,

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
                        text: "Health Care Workers",
                        align: "high"
                    },
                    labels: {
                        overflow: "justify"
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
                    text: 'Exposures by Age'
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

        }
    },
     created ()  {
    this.getExpo()
  },
    methods: {
    getExpo () {
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
      console.log(this.s)
      this.getAgeData()

    },


    getAgeData () {

       //
      var data = []
      for (var i in this.barOptions.xAxis.categories){
        data.push(this.getAgeNum(i))
      }
      this.barOptions.series[0].data = data
      this.mess = 'Data fetched'
      this.value = false


    },
    getAgeNum (cat) {
      var count = 0
      for (var x in this.s){
        var date =new Date(this.s[x].users.dob)
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms);
        var age = Math.abs(age_dt.getUTCFullYear() - 1970)
        if(age<26 && cat == 0){
          count++
        } else if (age>25 && age <= 35 && cat == 1){
          count++
        } else if (age>35 && age <= 45 && cat == 2){
          count++
        } else if (age>45 && age <= 55 && cat == 3){
          count++
        } else if (age>55 && age <= 65 && cat == 4){
          count++
        } else if (age > 65&& cat == 5){
          count++
        } else {
          count
        }
      }
      return count
    },

  }

}

</script>