<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md10
      >
        <material-card
          color="green"
          title="New Broadcast"
          text="Kindly fill all the required fields"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              New Broadcast
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>
          <v-form @submit="postBroadcast">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                >
                  <v-select
                    v-model="facility"
                    :items="all_facilities"
                    item-text="name"
                    item-value="id"
                    multiple
                    chips
                    label="Select Facility"
                    required="True"
                  />
                </v-flex>

                <v-flex
                  xs12
                >
                  <v-select
                    v-model="cadre"
                    :items="all_cadres"
                    item-text="name"
                    item-value="id"
                    multiple
                    chips
                    label="Select Cadre"
                    required
                  />
                </v-flex>

                <v-flex
                  xs12
                >
                  <v-textarea
                    v-model="message"
                    label="Message"
                    required="True"
                    placeholder="Write here"
                  />
                </v-flex>

                <v-btn
                  class="mr-4 success"
                  type="submit">submit</v-btn>

              </v-layout>
            </v-container>
          </v-form>
          <strong>Output:</strong>
          <pre> {{ output.error }} </pre>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      all_cadres: [],
      all_facilities: [],
      output: '',
      facility: '',
      cadre: '',
      message: ''

    }
  },
  created () {
    this.getCadres()
    this.getFacilities()
  },

  methods: {
    getCadres () {
      axios.get('cadres')
        .then((cadres) => {
          console.log(cadres.data)
          this.all_cadres = cadres.data.data
        })
        .catch(error => console.log(error.message))
    },

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },

    postBroadcast (e) {
      e.preventDefault()
      axios.post('broadcasts/web/create', {
        facility: this.facility.id,
        cadre: this.cadre.id,
        message: this.message
      })
        .then((response) => {
          this.output = response.data
          this.$router.push('/all_broadcast')
          console.log('success')
        })
        .catch((error) => {
          this.output = error
        })
    }
  }
}
</script>
