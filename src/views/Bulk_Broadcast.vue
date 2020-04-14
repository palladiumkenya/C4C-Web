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
                  @click="validate();">
                  submit</v-btn>

              </v-layout>
            </v-container>
          </v-form>

        </material-card>
      </v-flex>
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
      <div> {{ output.message }}<br> {{ output.errors }}  </div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
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
      snackbar: false,
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
