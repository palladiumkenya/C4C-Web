<template>
  <v-container >

      <v-flex
        xs12
        text-xs-right>
        <v-btn
          class="mx-0 font-weight-light "
          color="success"
          @click="$router.push('add_protocal');"
        >
          Add A New Facility Protocal
        </v-btn>
      </v-flex>

      <v-snackbar
        color="error"
        v-model="snackbar"
        :timeout="12000"
        top>
        <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div> {{ output.error }} {{result}}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
      </v-snackbar>

    <v-row dense>

      <v-col
        v-for="result in results"
        :key="result.id"
        cols="12"
        dark>

          <v-card
            class="mx-auto">
       
            <v-card-title class="headline">{{ result.title }}</v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-card-text class="text--primary">
                <div><span> Created On: </span> {{ result.created_at }}</div>
              </v-card-text>

              <v-btn
                color="orange"
                @click="$router.push({ name: 'View Facility Resource', params: {id: result.id} })">
                View More
              </v-btn>
            </v-card-actions>

          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      results: [],
      snackbar: false,
      output: '',
      result: ''
    }
  },
  created () {
    this.getProtocals()
  },
  methods: {

    getProtocals () {

      const vm = this

      axios.get('resources/hcw/protocols')
        .then((protocals) => {
          console.log(protocals.data)
          this.results = protocals.data.data
          
        })
        .catch(() => {
          vm.error = true
          vm.result = 'Check your internet connection or retry logging in.'
          vm.snackbar = true
        })
    }
  }
}
</script>

<style >
.v-card { margin: 20px; }

</style>
