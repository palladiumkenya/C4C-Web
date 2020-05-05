<template>
  <v-container >

    <v-flex
      xs12
      text-xs-right>
      <v-btn
        class="mx-0 font-weight-light "
        color="success"
        @click="$router.push('add_protocol');"
      >
        Add A New Facility Protocol
      </v-btn>

      
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :timeout="12000"
      color="error"
      top>
      <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div> {{ output.error }} {{ resp }}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>

    <v-flex v-if="loading">
      <Loader />
    </v-flex>

    <v-row
      v-else
      cols="12"
      dense>

      <v-col
        v-for="(result, index) in results"
        :key="result.id"
        dark>

        <v-card
          class="mx-auto">

          <v-card-title class="headline">{{ result.title }}</v-card-title>

          <v-divider/>

          <v-card-actions>
            <v-card-text class="text--primary">
              <div><span> Created On: </span> {{ result.created_at }}</div>
            </v-card-text>

            <v-btn
              icon
              color="orange"
              @click="$router.push({ name: 'View Facility Resource', params: {id: result.id} })">
              <v-icon> mdi-plus  </v-icon>
            </v-btn>

            <v-btn
              icon
              color="green"
              @click="$router.push({ name : 'Edit Facility Resource', params: {id: result.id } })">
              <v-icon> mdi-pencil </v-icon>
            </v-btn>

            <v-btn
              icon
              color="red"
              @click=" deleteResource(result.id, index); loading=true ">

              <v-icon> mdi-delete </v-icon>
            </v-btn>

          </v-card-actions>

        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '../components/core/Loader'

export default {
  components: { Loader },

  data () {
    return {
      results: [],
      snackbar: false,
      loading: true,
      output: '',
      resp: ''
    }
  },
  created () {
    this.getProtocols()
  },
  methods: {

    getProtocols () {
      axios.get('resources/hcw/protocols')
        .then((protocols) => {
          console.log(protocols.data)
          this.results = protocols.data.data

          this.loading = false
        })
        .catch(() => {
          this.error = true
          this.resp = 'Check your internet connection or retry logging in.'
          this.snackbar = true

          this.loading = false
        })
    },

    deleteResource(id, index) {
      axios.delete('resources/protocols/delete/' + id)
        .then((response) => {
          console.log(response.data)

          this.results.splice(index, 1)

          this.loading = false

          this.resp = 'Deleted Successfully'

          this.snackbar = true
        })
        .catch((error) => {
          this.error = true
          this.resp = 'Failed, please try again'
          this.snackbar = false
        })
    }
  }
}
</script>

<style >
.v-card { margin: 20px; }

</style>
