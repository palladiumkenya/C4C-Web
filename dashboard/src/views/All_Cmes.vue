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
          @click="$router.push('add_CME')"
        >
          Add A New CME
        </v-btn>
      </v-flex>

      <v-flex
        v-for="result in results"
        :key="result.id"
        xs12
        sm6
        md6
        lg4>
        <template>

          <v-card
            class="mx-auto"
            max-width="400"

          >
            <v-img
              :src="result.file"
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
              @click.stop="dialog = true">
              View More
            </v-btn>
          </v-card>

          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
            max-width="90%">
            <v-card>
              <v-toolbar
                dark
                color="primary">
                <v-btn
                  icon
                  dark
                  @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> {{ result.title }}</v-toolbar-title>
              </v-toolbar>

              <v-card-text height="500px">{{ result.body }}</v-card-text>
            </v-card>
          </v-dialog>

        </template>
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
