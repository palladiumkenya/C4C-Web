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
            <div></div>
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
            label="Email"
            v-model="form.email"
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
          <v-btn type="submit"
          color="success">
            Login
          </v-btn>
        </div>
      </div>
    </form>
  </v-card>
    </v-flex>
    </v-layout>
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
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }
    ),
    submit () {
      this.signIn(this.form)
        .then(() => {
          this.$router.replace({
            name: 'Dashboard'
          })
        })
        .catch(() => {
          console.log('failed')
        })
    }
  }
}
</script>

<style scoped>

</style>
