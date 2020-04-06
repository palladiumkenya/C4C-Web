
<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 4"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >
              <template>
                <section class="charts">
                  <h3>Registration Visualization</h3>
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2"><registration_by_cadre/></v-card-text>
          <v-card-text v-if="n==3"><Registration_by_age/></v-card-text>
            <v-card-text v-if="n==4"><Exposure_by_time/></v-card-text>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>
import VueHighcharts from 'vue2-highcharts'
// import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from 'highcharts'
import Registration_by_cadre from "./Registration_by_cadre";
import Registration_by_age from "./Registration_by_age";
import Exposure_by_time from "./Exposure_by_time";

// SeriesLabel(Highcharts);


export default {
  components: {
    Exposure_by_time,
    Registration_by_age,
    Registration_by_cadre,
    VueHighcharts
  },
  data () {
    return {

    }
  }
}
</script>
