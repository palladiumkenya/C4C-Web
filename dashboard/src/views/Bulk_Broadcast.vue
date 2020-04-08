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
                ></v-text-field> 
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
                  @click="validate(); snackbar.show = true">
                  submit</v-btn>

              </v-layout>
            </v-container>
          </v-form>

        </material-card>
      </v-flex>
    </v-layout>

      <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="9000"
      top>
      {{ snackbar.message }}

      <v-btn
      dark
      text
      @click="snackbar = false"/>

    </v-snackbar>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      valid: true,
      snackbar:{
        show: false,
        message: null,
        color: null
      } , 
      output: '',
      phoneNumbers: [],
      message: '',
      rules: {
        required: value => !!value || 'This field is required.'
      }
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
        .then(() => {
          this.snackbar = {
            message : 'Data Saved Successfully',
            color : 'success',
            show: true
          }
          this.$router.push('/broadcast')
        })
        .catch(error => {
          this.snackbar = {
            message : 'Error, please try again',
            color : 'error',
            show: true
          }
      })
  }
}
}
</script>
