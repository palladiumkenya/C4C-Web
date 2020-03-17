
<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>First Disease</v-tab>
      <v-tab>Second Disease</v-tab>
      <v-tab>Third Disease</v-tab>
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
                  <h3>Other Diseases Summary</h3>
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">Disease list</v-card-text>
          <v-card-text v-if="n==3">Disease list</v-card-text>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>


