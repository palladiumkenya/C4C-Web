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
            <div/>
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
                <label>First Name:</label>
                <v-chip
                  class="ma-2"
                  x-large
                >
                  {{ user.first_name }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <label>Surname:</label>
                <v-chip
                  class="ma-2"
                  x-large>
                  {{ user.surname }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <label>Gender:</label>
                <v-chip
                  class="ma-2"
                  x-large>
                  {{ user.gender }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <label>Email:</label>
                <v-chip
                  class="ma-2"
                  x-large
                >
                  {{ user.email }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <label>Role:</label>
                <v-chip
                  class="ma-2"
                  x-large
                >
                  {{ user.role.name }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md12
              >
                <label>Account created on:</label>
                <v-chip
                  class="ma-2"
                  x-large
                >
                  {{ user.created_at }}
                </v-chip>
              </v-flex>
              <v-flex
                xs12
                md8>
                <label>Facility:</label>
                <v-chip
                  class="ma-2"
                  x-large
                >
                  {{user.hcw.facility.name}}
                </v-chip>
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
import { mapGetters } from 'vuex'
export default {
  //
  data () {
    return {
      logo: 'c4c_new.png'
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
