<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap
    >
      <v-card
        v-for="result in result.results"
        :key="result.id"
        fullscreen
        hide-overlay
        scrollable
        max-width="90%"
      >

        <v-card-title>{{ result.title }}</v-card-title>
        <v-list
          v-for="file in result.files"
          :key="file" >
          <v-card-text height="500px"> Download Documents :<a :href=" file "> {{ file }} </a> </v-card-text>
        </v-list>
        <v-card-text height="500px">{{ result.body }}</v-card-text>

      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      result: [],
      results: [],
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
          console.log(resources.data)
          this.results = resources.data.data
        })
        .catch(error => console.log(error.message))
    }
  }
}
</script>
