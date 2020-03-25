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
            <div></div>
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
                    v-model="role"
                    :rules="[rules.required]"
                    :items="items"
                    label="Role"
                    class="purple-input"
                  />
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
                    value="650"
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
                    color="success"
                  >
                    Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

          <pre>{{ output }}</pre>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  //
  data () {
    return {
      show3: false,
      fname: '',
      surname: '',
      gendInp: '',
      role: '',
      password: '',
      cnf_pass: '',
      msisdn: '',
      email: '',
      output: '',
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
      ]
    }
  },
  mounted () {

  },
  methods: {
    postUser (e) {
      e.preventDefault()

      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Origin', 'http://localhost:8080')

      fetch('http://c4ctest.mhealthkenya.org/api/auth/signup', {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: headers
      })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error.message))
      // axios.post('http://c4ctest.mhealthkenya.org/api/auth/signup',{
      //   first_name: this.fname,
      //   surname: this.surname,
      //   msisdn: this.msisdn,
      //   role_id: this.role.charAt(0),
      //   gender: this.gendInp,
      //   email: this.email,
      //   password: this.password,
      //   password_confirmation: this.cnf_pass},
      //   head
      //   )
      // .then(function (response) {
      //   currentObj.output = response.data;
      // })
      // .catch(function (error) {
      //   currentObj.output = error['error'];
      // });

      // axios({
      //   'method': 'POST',
      //   'url': 'http://127.0.0.1:8000/api/auth/signup/',
      //   'headers': {
      //     'Content-Type': 'application/json'
      //   },
      //   'data': {
      //     first_name: currentObj.fname,
      //     surname: currentObj.surname,
      //     msisdn: currentObj.msisdn,
      //     role_id: currentObj.role.charAt(0),
      //     gender: currentObj.gendInp,
      //     email: currentObj.email,
      //     password: currentObj.password,
      //   }
      // })
      //   .then((response) => {
      //     currentObj.output = response
      //     console.log(currentObj.output)
      //   })
      //   .catch((error) => {
      //     currentObj.output = error
      //     console.log(currentObj.output)
      //   })
    }
  }
}
</script>
