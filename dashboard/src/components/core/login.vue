<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >{{ form }}
    <form @submit.prevent="submit">
      <div>
        <label for="email">
          Email
        </label>

        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email">

        <label for="password">
          Password
        </label>

        <input
          id="password"
          v-model="form.password"
          type="password"
          name="password">

        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
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
        .then(() => this.$router.push(this.$route.query.redirect || '/'))
        .catch(() => {
          console.log('failed')
        })
    }
  }
}
</script>

<style scoped>

</style>
