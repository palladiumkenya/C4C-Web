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
        <v-card>
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              Login
            </p>
            <div class="text--primary">
              Provide credentials
            </div>
          </v-card-text>
          {{ form }}
          <form @submit.prevent="submit">
            <div>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  id="email"
                  v-model="form.email"
                  label="Email"
                  type="email"
                  name="email"/>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  id="password"
                  v-model="form.password"
                  type="password"
                  name="password"
                  label="Password"/>
              </v-flex>

              <div>
                <v-btn
                  type="submit"
                  color="success">
                  Login
                </v-btn>
                {{  }}
              </div>
            </div>
          </form>
        </v-card>
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
      <div>{{  }}</div>
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
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {

  },
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      output: '',
      pre_out: '',
      color: null,
      colors: [
        'success'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false
    }
  },
  created () {
    this.checkLO()
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }
    ),
    submit () {
      this.signIn(this.form)
        .then(() => {
          this.$router.push('/'
          )
        })
        .catch(() => {
          console.log('failed')
        })
    },
    checkLO () {
      //if (message){
        this.snack('middle','center')
      //}
    },
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }
      this.color = this.colors[0]

      this.snackbar = true
    }
    
  }
}
</script>

<style scoped>

</style>
