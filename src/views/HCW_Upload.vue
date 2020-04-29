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
          title="Add a New Healthcare Worker"
          text="Kindly fill all the required fields"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              Add A New Healthcare Worker
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>
          <v-form @submit="postUser">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="fname"
                    :rules="[rules.required]"
                    label="First Name"
                    class="green-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="surname"
                    :rules="[rules.required]"
                    label="Last Name"
                    class="green-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-combobox
                    v-if="user.role_id == 1"
                    v-model="role"
                    :rules="[rules.required]"
                    :items="items"
                    label="Role"
                    class="purple-input"
                  />
                  <v-chip
                    v-else
                    class="ma-2"
                    x-large
                  >
                    Role: Health Care Worker
                  </v-chip>
                </v-flex>

                <v-flex
                  xs12
                  md8
                >
                  <v-text-field
                    v-model="email"
                    :rules="[rules.emailRules]"
                    label="Email Address"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-combobox
                    v-model="gendInp"
                    :items="gender"
                    :rules="[rules.required]"
                    label="Gender"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md8
                >
                  <v-text-field
                    v-model="msisdn"
                    :rules="[rules.required]"
                    label="Mobile"
                    single-line
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show3 = !show3"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="cnf_pass"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Repeat Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show3 = !show3"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="affl"
                    label="Enter affliation"
                    class="green-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                  text-xs-left
                >
                  <router-link to="/bulk-signup">
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="info"
                    >
                      File signup
                    </v-btn>
                  </router-link>
                </v-flex>

                <v-flex
                  xs12
                  md6
                  text-xs-right
                >
                  <v-btn
                    type="submit"
                    class="mx-0 font-weight-light"
                    large
                    color="success"
                  >
                    Submit
                  </v-btn>
                </v-flex>
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
      <div>{{ pre_out }}{{ output.message }}<br> {{ output.errors }}</div>
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
import { mapGetters } from 'vuex'
export default {
  //
  data () {
    return {
      absolute: true,
      overlay: false,
      show3: false,
      fname: '',
      surname: '',
      gendInp: '',
      role: '',
      password: '',
      cnf_pass: '',
      msisdn: '',
      email: '',
      affl: '',
      output: '',
      pre_out: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRules: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      gender: [
        'Male',
        'Female'
      ],
      items: [
        '3 | Health care worker',
        '4 | Facility Admin'
      ],
      resp: false,
      color: null,
      colors: [
        'success',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted () {
    if (this.user.role_id != 1){
      this.role = 3
    }
  },
  methods: {
    testFill () {
      if (this.fname == '') {
        this.pre_out = 'First Name must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.surname == '') {
        this.pre_out = 'surname must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.msisdn == '') {
        this.pre_out = 'Mobile must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.role == '') {
        this.pre_out = 'Role must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.gender == '') {
        this.pre_out = 'gender must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.password == '') {
        this.pre_out = 'password must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.cnf_pass == '') {
        this.pre_out = 'Repeate password must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.password != this.cnf_pass) {
        this.pre_out = 'Passwords dont match'
        this.snack('top', 'center')
        return false
      } else {
        return true
      }
    },
    clearData () {

    },
    postUser (e) {
      e.preventDefault()
      if (this.testFill()) {
        axios.post('auth/signup', {
          first_name: this.fname,
          surname: this.surname,
          msisdn: this.msisdn,
          role_id: this.role.charAt(0),
          gender: this.gendInp,
          email: this.email,
          password: this.password,
          password_confirmation: this.cnf_pass,
          message: `Welcome ${this.fname} to Care For the Carer (C4C) SMS Platform. ${this.affl} has successfully registered you. Messages sent and received are not charged.${this.affl}` }
        )
          .then((response) => {
            this.output = response.data
            this.resp = Boolean(response.data.success)
            this.clearData()
            this.snack('top', 'center')
          })
          .catch((error) => {
            this.output = error
            this.snack('top', 'center')
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
