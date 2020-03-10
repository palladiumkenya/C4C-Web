yarn


<template>

  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>

      <!-- Filters -->


      <!-- Start Cards -->



      <!-- End Cards -->


      <!-- Start Tables -->

      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Cadres Stats"
          text="Number of Registered HCWs Per Cadre"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.cadre }}</td>
              <td class="text-xs-right">{{ item.number }}</td>

            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <!-- Start Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >


    </v-flex>


      <!-- End Graphs -->



      <!-- Start Tables -->

    </v-layout>
  </v-container>
</template>

<script>
export default {
   components: {
    VueHighcharts
  },
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Number',
          value: 'number',
          align: 'right'
        },

      ],
      items: [
        {
          cadre: 'Doctor',
          number: '738'
        },
        {
          cadre: 'Clinical Officer',
          number: '232'
        },
        {
          cadre: 'Nurse',
          number: '8,447'
        }, {
         cadre: 'Student',
          number: '3,087'
        }, {
          cadre: 'Laboratory Technologist',
          number: '546'
        }, {
          cadre: 'VCT Counsellor',
          number: '1,050'
        }
      ],

      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
<!-- Pie Exposure chart -->



<script>
import VueHighcharts from "vue2-highcharts";
import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from "highcharts";

SeriesLabel(Highcharts);

const data = {
  title: {
    text: "Combination chart"
  },
  xAxis: {
    categories: ["Apples", "Oranges", "Pears", "Bananas", "Plums"]
  },
  labels: {
    items: [
      {
        html: "Total fruit consumption",
        style: {
          left: "50px",
          top: "18px",
          color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
        }
      }
    ]
  },
  series: [
    {
      type: "column",
      name: "Jane",
      data: [3, 2, 1, 3, 4]
    },
    {
      type: "column",
      name: "John",
      data: [2, 3, 5, 7, 6]
    },
    {
      type: "column",
      name: "Joe",
      data: [4, 3, 3, 9, 0]
    },
    {
      type: "spline",
      name: "Average",
      data: [3, 2.67, 3, 6.33, 3.33],
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: "white"
      }
    },
    {
      type: "pie",
      name: "Total consumption",
      data: [
        {
          name: "Jane",
          y: 13,
          color: Highcharts.getOptions().colors[0] // Jane's color
        },
        {
          name: "John",
          y: 23,
          color: Highcharts.getOptions().colors[1] // John's color
        },
        {
          name: "Joe",
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
};
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data
    };
  }
};
</script>





