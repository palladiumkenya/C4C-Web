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
        md8
      >
       <v-form @submit="postUser">
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >

      
          <v-card-text>
            <p class="display-1 text--primary">
              User Profile
            </p>
            <div class="text--primary"/>
          </v-card-text>
          <v-container py-0>
            <v-layout wrap>
              <v-flex
                xs12
                md4
              >
                  <v-text-field
                  label="First Name"
                  v-model="userdata.first_name"
                  :rules="[v => !!v || 'First Name is required']"
                >
                </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Surname"
                  v-model="userdata.surname"
                  :rules="[v => !!v || 'Surname is required']"
                >
                </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
              <v-select
                v-model="userdata.gender"
                :items="gender"
                item-value="id"
                label="Gender"
                :rules="[v => !!v || 'Gender is required']"
                required
              > 
              </v-select>
              </v-flex>

              <v-flex
                xs12
                md6
              >
               <v-text-field
                v-model="userdata.email"
                label="E-mail"
                required
                :rules="[v => !!v || 'Email is required']"
              >
              </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-select
                v-model="userdata.role.name"
                :items="roles"
                item-value="id"
                label="Role"
                :rules="[v => !!v || 'Role is required']"
                required
              >
              </v-select>
              </v-flex>

              <v-flex
                xs12
                md6>
                <v-select
                  v-model="userdata.hcw.facility_name"
                  :items="facilities"
                  item-value="id"
                  item-text="name"
                  label="Facility"
                  :rules="[v => !!v || 'Facility is required']"
                  required
                > </v-select> 
              </v-flex>

              <v-flex
                xs12
                md6>
                <v-select
                  v-model="userdata.cadre"
                  :items="cadres"
                  item-text="name"
                  label="Cadre"
                  item-value="id"
                  :rules="[v => !!v || 'Cadre is required']"
                  required
                > 
                </v-select>    
              </v-flex> 

              <v-flex
                xs12
                text-xs-right
              >
                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                  type="submit"
                >
                  Update Profile
                </v-btn>

                <v-alert
                    :value="alert"
                    icon = "mdi-alert"
                    dismissible
                    outline color="error"
                    elevation="2"
                  >
                    <h6> {{ output.error }} {{ output.message }} </h6>
                  </v-alert>

              </v-flex>

            </v-layout>
          </v-container>
       
        </material-card>
         </v-form>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <material-card class="v-card-profile text-xs-center">
          <v-card-text>
            <h4 class="card-title font-weight-light">Profile</h4>
            <v-avatar
              slot="offset"
              class="mx-auto d-block"
              size="130"
            >
              <v-img
                :src="logo"
              />
            </v-avatar>
            <div/>
            <p class="display-1 text--primary">
              {{ user.first_name }} {{ user.surname }}
            </p>
            <h6 class="category text-gray font-weight-thin mb-3">{{ user.role.name }}</h6>
            <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth</p>

          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  //
  data () {
    return {
      logo: 'c4c_new.png',
      gender: [
        'MALE',
        'FEMALE',
        'UNDEFINED'
      ],
      roles: [
        'Super Admin',
        'Partner Admin',
        'Health care worker',
        'Facility Admin'
      ],
      facilities : [],
      cadres: [],
      userdata : {
        first_name: '',
        surname: '',
        gender: '',
        email: '',
        role: '',
        facility_name: '',
        cadre: ''
      },
      userdata: '',
      output: '',
      alert: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    this.getFacilities()
    this.getCadres()
    this.getUser()

  },

  methods : {
    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
        })
        .catch(error => console.log(error.message))
    },

    getCadres () {
      axios.get('cadres')
        .then((cadres) => {
          console.log(cadres.data)
        })
        .catch(error => console.log(error.message))
    },

    getUser () {
      var id = this.$route.params.id
       axios.get('auth/user')
        .then((user) => {
        this.userdata = user.data.data 
        console.log(user.data)

        }).catch((error) => {
        console.log(error.message)
        })
    },

    postUser (e) {
      e.preventDefault();
      
      let allData = new FormData();

      allData.append('first_name', this.userdata.first_name)
      allData.append('surname', this.userdata.surname)
      allData.append('gender', this.userdata.gender)
      allData.append('email', this.userdata.email)
      allData.append('role', this.user.role)
      allData.append('facility_name', this.user.first_name)
      allData.append('cadre', this.user.cadre)

      axios({
        method: 'POST',
        url: 'auth/complete_profile',
        data: allData,
      })
      .then((response) => {
        this.output = response.data
        this.alert = true
      })
      .catch(error => {
        this.output = error
        console.log(error)
      })
    }


  }  
}
</script>
