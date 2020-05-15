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
                    v-model="cadre"
                    :items="cadres"
                    label="Cadre"
                    class="purple-input"/>
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
                    :hint="`${mobileHint}`"
                    single-line
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    :return-value.sync="dob"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="dob"
                      label="DoB"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                    <v-date-picker
                      :dark="true"
                      v-model="dob"
                      :max="maxDate"
                      no-title
                      scrollable>
                      <v-spacer/>
                      <v-btn
                        flat
                        color="primary"
                        @click="menu = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menu.save(dob)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="id_no"
                    name="input-10-2"
                    label="ID No."/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-combobox
                    v-model="dept"
                    :items="departments"
                    label="Department"
                    class="green-input"/>
                </v-flex>
                <v-flex
                  v-if="user.role_id === 1"
                  xs12
                  md6
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    item-text="name"
                    item-value="id"
                    label="Select Facility"
                    clearable
                    persistent-hint
                    chips/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                  text-xs-left
                >
                  <v-btn
                    type="submit"
                    class="mx-0 font-weight-light"
                    color="infos"
                  >
                    Submit
                  </v-btn>
                </v-flex>

                <v-flex
                  xs12
                  md6
                  text-xs-right
                  >
                  <router-link to="/bulk-signup">
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="primary"
                    >
                      File signup
                    </v-btn>
                  </router-link>
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
      menu: false,
      maxDate: '2004-01-01',
      dob: '2004-01-01',
      fname: '',
      surname: '',
      gendInp: '',
      cadre: '',
      id_no: '',
      msisdn: '',
      email: '',
      dept: '',
      output: '',
      pre_out: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRules: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      gender: [
        'MALE',
        'FEMALE',
        'TRANSGENDER',
        'UNDEFINED'
      ],
      cadres: [
        'Doctor',
        'Clinical officer',
        'Nurse',
        'Student',
        'Laboratory Technologist',
        'Cleaner',
        'Waste Handler',
        'VCT Counsellor',
        'Other-Specify'

      ],
      departments: [
        'Outpatient department (OPD)',
        'Inpatient Service (IP)',
        'Medical Department',
        'New Born Unit (NBU)',
        'Renal Unit',
        'Mother and Child (MCH)',
        'Paramedical Department',
        'Physical Medicine and Rehabilitation Department',
        'Operational Theatre Complex (OP)',
        'Pharmacy Department',
        'Radiology Department (X-ray)',
        'Dietary Department',
        'Medical Record Department (MRD)',
        'Not Specified'

      ],
      mobileHint: ["Mobile Format is 254700000000"],
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
      snackbar: false,
      all_facilities: [],
      facility: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    if (this.user.role_id !== 1) {
      this.facility = this.user.hcw.facility_id
    } else {
      this.getFacilities()
    }
  },
  methods: {
    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },
    testFill () {
      if (this.fname === '') {
        this.pre_out = 'First Name must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.surname === '') {
        this.pre_out = 'surname must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.msisdn === '') {
        this.pre_out = 'Mobile must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.cadre === '') {
        this.pre_out = 'Role must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.gender === '') {
        this.pre_out = 'gender must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.dept === '') {
        this.pre_out = 'Department must be filled out'
        this.snack('top', 'center')
        return false
      } else if (this.dob === '') {
        this.pre_out = 'DOB must be filled out'
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
        let formData = new FormData()

        if (this.user.role.id === 4) {
          formData.append('facility_id', this.user.hcw.facility_id)
        } else if (this.user.role.id === 1) {
          formData.append('facility_id', this.facility.id)
        }
          formData.append('facility_department', this.dept),
          formData.append('cadre', this.cadre),
          formData.append('first_name', this.fname),
          formData.append('surname', this.surname),
          formData.append('email', this.email),
          formData.append('msisdn', this.msisdn),
          formData.append('gender', this.gendInp),
          formData.append('dob', this.dob),
          formData.append('id_no', this.id_no)

        axios({
          method: 'POST',
          url: 'auth/bulk/register',
          data: formData
        })
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
