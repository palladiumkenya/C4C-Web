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
          @click="$router.push('add_protocal')"
        >
          Add A New Protocal
        </v-btn>
      </v-flex>

      <v-list-item
        v-for="result in results"
        :key="result.id"
        xs12
        sm6
        md6
        lg4
        dense>

        <v-list
          class
          xs12
          sm6
          md6
          lg4
          dense >

          <v-card
            min-width="900"
            max-width="900"
            style="padding-bottom"
            class="mx-auto"
          >
            <v-card-title class="headline">{{ result.title }}</v-card-title>

            <v-card-actions>
              <v-card-text class="text--primary">
                <div><span> Created On: </span> {{ result.created_at }}</div>
              </v-card-text>

              <v-btn
                color="orange"
                @click="$router.push({ name: 'View Protocal', params: {id: result.id} })">
                View More
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-list>
      </v-list-item>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      results: []
    }
  },
  created () {
    this.getProtocals()
  },
  methods: {
    getProtocals () {
      axios.get('resources/hcw/protocols')
        .then((protocals) => {
          console.log(protocals.data)
          this.results = protocals.data.data
        })
        .catch(error => console.log(error.message))
    }
  }
}
</script>
