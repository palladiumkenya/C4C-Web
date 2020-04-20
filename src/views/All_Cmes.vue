<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap>

      <v-flex
        xs12
        text-xs-right>
        <v-btn
          class="mx-0 font-weight-light "
          color="success"
          @click="$router.push('add_CME')">

          Add A New Public Resource
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
      <div> {{ output.errors }} {{result}}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
      </v-snackbar>


      <v-flex 
        v-for="result in results"
        :key="result.id"
        xs12
        sm6
        md6
        lg4>

          <v-card
            class="mx-auto"
            max-width="400"

          >
            <v-img
              :src="result.file || 'sunshine.jpg' "
              class="white--text align-end"
              height="200px"
            />

            <v-card-title>{{ result.title }}</v-card-title>

            <v-card-text class="text--primary">
              <div><span>Created On: </span>{{ result.created_at }}</div>
            </v-card-text>

            <v-btn
              :style="{left: '50%', transform:'translateX(-50%)'}"
              color="orange"
              @click="$router.push({ name : 'View Public Resource', params: {id: result.id } })">

              View More
            </v-btn>

          </v-card>
      </v-flex>
    </v-layout>
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
      result: '',
      loading: true
    }
  },
  created () {
    this.getResources()
  },

  methods: {
    getResources () {

      const vm = this
      axios.get('resources/cmes')
        .then((resources) => {
          console.log(resources.data)
          this.results = resources.data.data
          this.loading = false
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
