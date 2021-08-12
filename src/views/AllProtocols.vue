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

    <div v-if="loading">
      <Loader />
    </div>

    <v-flex
      v-for="(result, index) in results"
      v-else
      :key="result.id"
      cols="12"
      dense
      dark>

      <v-card
        class="mx-auto">

        <v-card-title class="headline">{{ result.title }}</v-card-title>

        <v-divider/>

        <v-card-title class="text--primary">{{ result.facility.name }}</v-card-title>

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

    </v-flex>
  </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '../components/core/Loader'
import { mapGetters, mapState } from 'vuex'

export default {
  components: { Loader },

  computed: {

    ...mapGetters({
      user: 'auth/user'
    })
  },

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
      if (this.user.role_id === 1){
        axios.get(`resources/protocols`)
          .then((protocols) => {
            this.results = protocols.data.data

            this.loading = false
          })
          .catch(() => {
            this.error = true
            this.resp = 'Check your internet connection or retry logging in.'
            this.snackbar = true

            this.loading = false
          })
      } else {
        axios.get(`resources/protocols/${this.user.hcw.facility_id}`)
          .then((protocols) => {
            this.results = protocols.data.data

            this.loading = false
          })
          .catch(() => {
            this.error = true
            this.resp = 'Check your internet connection or retry logging in.'
            this.snackbar = true

            this.loading = false
          })

      }

    },

    deleteResource (id, index) {
      axios.delete('resources/protocols/delete/' + id)
        .then((response) => {

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
