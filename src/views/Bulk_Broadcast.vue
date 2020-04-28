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
              New Bulk Broadcast
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>

          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="post_BulkBroadcast">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                >
                  <v-text-field
                    :rules="[rules.required]"
                    v-model="phoneNumbers"
                    label="Add Phone Numbers Seperated By A Comma"
                    required
                    single-line
                  />
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
                  @click="validate(); alert=!alert; dialog1=true ">
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

export default {
  data () {
    return {
      valid: true,
      dialog1: false,
      alert: false,
      output: '',
      phoneNumbers: [],
      message: '',
      rules: {
        required: value => !!value || 'This field is required.'
      }
    }
  },

  watch: {
    dialog1 (val) {
      if (!val) return
      setTimeout(() => (this.dialog1 = false), 4000)
    }
  },

  methods: {

    validate () {
      this.$refs.form.validate()
    },

    post_BulkBroadcast (e) {
      e.preventDefault()

      axios.post('broadcasts/web/direct', {
        phone_numbers: this.phoneNumbers,
        message: this.message
      })
        .then((response) => {
          this.output = response.data
          this.resp = Boolean(response.data.success)
          this.alert = true
          this.$router.push('/broadcast')
        })
        .catch(error => {
          this.output = error
          this.alert = true
        })
    }
  }
}
</script>
