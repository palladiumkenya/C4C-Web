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
          @click="$router.push('new_covid19_resources')">

          Add A New COVID 19 Resource
        </v-btn>
      </v-flex>

      <v-flex v-if="loading">
        <Loader />
      </v-flex>

      <v-flex
        v-for="result in results"
        v-else
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
            @click="$router.push({ name : 'View CME', params: {id: result.id } })">

            View More
          </v-btn>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '../components/core/Loader.vue'

export default {
  components: { Loader },

  data () {
    return {
      results: [],
      loading: true,
      dialog: false
    }
  },
  created () {
    this.getResources()
  },

  methods: {
    getResources () {
      axios.get('resources/cmes')
        .then((resources) => {
          this.results = resources.data.data
          console.log(resources.data.data)

          this.loading = false
        })
        .catch((error) => {
          console.log(error.message)

          this.loading = false
        })
    }
  }
}
</script>
