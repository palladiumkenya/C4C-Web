<template>
  <v-app
    id="login"
    class="log">
    <v-content>
      <v-container
        fluid
        fill-height>
        <v-layout
          align-center
          justify-center>
          <v-flex
            xs12
            sm8
            md4
            lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <v-img
                    :src="logo"
                    width="180"
                    height="180"/>
                  <h3 class="flex my-4 clo">Care for the Carer Login</h3>
                </div>
                <form>
                  <v-text-field
                    v-model="form.email"
                    :error="error"
                    :rules="[rules.required]"
                    append-icon="mdi-account"
                    name="email"
                    label="Email"
                    type="text"/>
                  <v-text-field
                    id="password"
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[rules.required]"
                    v-model="form.password"
                    :error="error"
                    name="password"
                    label="Password"
                    @click:append="hidePassword = !hidePassword"/>
                </form>
                <a
                  href="/forgot_password"
                  style="color: black">Forgot Your Password?</a>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :loading="loading"
                  block
                  color="success"
                  @click.prevent="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        :color="'#f55a4e'"
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      logo: 'c4c_new.png',
      loading: false,
      form: {
        email: '',
        password: ''
      },
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
    computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      const vm = this

      if (!vm.form.email || !vm.form.password) {
        vm.result = "Email and Password can't be empty."
        vm.showResult = true

        return
      }

      this.signIn(this.form)
        .then(() => {
          // if(this.user != null){
            this.$router.replace({
              name: 'Dashboard'
            })
          // } else {
          //   vm.error = true
          //   vm.result = 'Not an admin. Please check your email.'
          //   vm.showResult = true
          // }
        })
        .catch(() => {
          // console.log('failed')
          vm.error = true
          vm.result = 'Email or Password is incorrect.'
          vm.showResult = true
        })
    }
  }
}
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
