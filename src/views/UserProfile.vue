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
                  v-model="user.first_name"
                >
                </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="First Name"
                  v-model="user.surname"
                >
                </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
              <v-select
                v-model="user.gender"
                :items="gender"
                label="Gender"
                required
              > 
              </v-select>
              </v-flex>

              <v-flex
                xs12
                md6
              >
               <v-text-field
                v-model="user.email"
                label="E-mail"
                required
              >
              </v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-select
                v-model="user.role"
                :items="items"
                label="Role"
                required
              >
              </v-select>
              </v-flex>

              <!-- <v-flex
                xs12
                md12
              >
               <v-text-field
                v-model="user.created_at"
                label="Created_at"
                required
              ></v-text-field>
              </v-flex> -->

              <v-flex
                xs12
                md8>
                <v-select
                  v-model="user.hcw.facility_name"
                  :items="all_facilities"
                  label="Facility"
                  required
                ></v-select>
              </v-flex>

              <v-flex
                xs12
                text-xs-right
              >
                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                >
                  Update Profile
                </v-btn>
              </v-flex>

            </v-layout>
          </v-container>
        </material-card>
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
      all_facilities : [],
      roles: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    this.getFacilities()
    this.getRoles()

  },

  methods : {
    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },

    getRoles () {
      axios.get('roles')
        .then((roles) => {
          console.log(roles.data)
          this.all_roles = roles.data.data
        })
        .catch(error => console.log(error.message))
    }
  }  
}
</script>
