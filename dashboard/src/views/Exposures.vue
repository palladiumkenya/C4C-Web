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
                  <vue-highcharts :options="options" />
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
import VueHighcharts from 'vue2-highcharts'

import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
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

  components: {
    VueHighcharts
  },
  data () {
    return {
      options: data
    }
  }
}
</script>
