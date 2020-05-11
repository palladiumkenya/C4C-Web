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
        md11
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
                  v-if="user.role_id === 1 || user.role_id == 5"
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
                  v-else
                >
                  <label>Facility:</label>
                  <v-chip
                    class="ma-2"
                    x-large
                  >
                    {{ user.hcw.facility_name }}
                  </v-chip>
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

              <v-flex
              xs12
              >
                <v-btn
                  :disabled="!valid"
                  class="mr-4 success"
                  type="submit"
                  @click="validate(); dialog1=true; alert=!alert; ">
                  submit</v-btn>
              </v-flex>   

              <v-flex
                xs12
              >
                <v-dialog
                  v-model="dialog1"
                  max-width="290"
                  lazy>
                  <v-card>
                    <v-card-text class="text-xs-center">
                      <v-progress-circular
                        :size="70"
                        indeterminate
                        class="primary--text"/>
                    </v-card-text>
                  </v-card>
                </v-dialog>

                <v-alert
                  :value="alert"
                  head
                  type="success"
                  border="right"
                  icon = "mdi-alert"
                  dismissible
                  text
                  transition="scale-transition"
                  color = "#47a44b"
                  dense
                >
                  <h6> {{ output.error }} {{ output.message }} </h6>
                </v-alert>
              </v-flex>    

              </v-layout>
              

            </v-container>
          </v-form>

        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      all_cadres: [],
      all_facilities: [],
      valid: true,
      alert: false,
      dialog1: false,
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
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
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
          let all_facilities = facilities.data.data
          if (this.user.role_id == 5){
            for (var fac in all_facilities) {
              if (all_facilities[fac].county == this.user.county) {
                this.all_facilities.push(all_facilities[fac])
              }
            } 
          } else {
            this.all_facilities = all_facilities
          }
        })
        .catch(error => console.log(error.message))
    },

    postBroadcast (e) {
      e.preventDefault()
      if (this.user.role_id === 1||this.user.role_id == 5) {
        axios.post('broadcasts/web/create', {
          facility_id: this.facility.id,
          cadres: this.cadres.map(item => item.id),
          message: this.message
        })
          .then((response) => {
            this.output = response.data
            this.alert = true
            this.$router.push('/broadcast')
          })
          .catch(error => {
            this.output = error
            this.alert = true
          })
      } else if (this.role_id === 4) {
        axios.post('broadcasts/web/create', {
          facility_id: this.user.hcw.facility_id,

          cadres: this.cadres.map(item => item.id),
          message: this.message
        })
          .then((response) => {
            this.output = response.data
            this.alert = true
            this.$router.push('/broadcast')
          })
          .catch(error => {
            this.output = error
            this.alert = true
          })
      }
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
