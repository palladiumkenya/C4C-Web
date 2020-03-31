
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
              <template>
                <section class="charts">
                  <h4>HBV Immunization Summary</h4>
                  <p>immunizations done<br>{{immunization_number}}</p>
                  <vue-highcharts :options="options" />
                </section>
              </template>

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
  import VueHighcharts from "vue2-highcharts";
//import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from "highcharts";
import axios from "axios";

export default {

  created() {
    this.getImmunizations()
  },
  methods: {
    getImmunizations() {
      axios.get('immunizations/all')
              .then(exp => {
                this.immunization_number = exp.data.data  // <--- Im thinking this is an object
                console.log(exp.data.data)
              })
              .catch(error => console.log(error))

    }
  }
}
</script>
