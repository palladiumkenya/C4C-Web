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

          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="postBroadcast">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    :search-input.sync="search"
                    :rules="[rules.required]"
                    :return-object="true"
                    item-text="name"
                    item-value="id"
                    hide-selected
                    chips
                    label="Select Facility"
                    required
                  />
                </v-flex>

                <v-flex
                  xs12
                >
                  <v-combobox
                    ref="cadres"
                    v-model="cadres"
                    :items="all_cadres"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="id"
                    multiple
                    chips
                    label="Select Cadre"
                    required

                  />
                  <strong>{{ all_cadres.item }}</strong>&nbsp;
                </v-flex>

                <v-flex
                  xs12
                >
                  <v-textarea
                    :rules="[rules.required]"
                    v-model="message"
                    label="Message"
                    placeholder="Write here"
                    required
                  />
                </v-flex>

                <v-btn
                  :disabled="!valid"
                  class="mr-4 success"
                  type="submit"
                  @click="validate(); ">
                  submit</v-btn>

              </v-layout>
              <v-snackbar
                :color="color"
                :bottom="bottom"
                :top="top"
                :left="left"
                :right="right"
                v-model="snackbar"
                dark
              >
                <v-icon
                  color="white"
                  class="mr-3"
                >
                  mdi-bell-plus
                </v-icon>
                <div> {{ output.message }}<br> {{ output.errors }} </div>
                <v-icon
                  size="16"
                  @click="snackbar = false"
                >
                  mdi-close-circle
                </v-icon>
              </v-snackbar>

            </v-container>
          </v-form>

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
      valid: true,
      color: null,
      colors: [
        'success',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      resp: false,
      snackbar: false,
      search: null,
      facility: '',
      output: '',
      cadres: [],
      message: '',
      rules: {
        required: value => !!value || 'This field is required.'
      }

    }
  },
  created () {
    this.getCadres()
    this.getFacilities()
  },

  methods: {
    validate () {
      this.$refs.form.validate()
    },

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
        facility_id: this.facility.id,

        cadres: this.cadres.map(item => item.id),
        message: this.message
      })
        .then((response) => {
          this.output = response.data
          this.resp = Boolean(response.data.success)
          this.snack('top', 'center')
          this.$router.push('/broadcast')
        })
        .catch(error => {
          this.output = error
          this.snack('top', 'center')
        })
    },
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }
      if (this.resp) {
        this.color = this.colors[0]
      } else {
        this.color = this.colors[1]
      }
      this.snackbar = true
    }
  }
}
</script>
