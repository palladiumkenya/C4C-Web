<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >

      <v-flex
        md12
      >
        <material-card
          color="green"
          full-width
          title="All Users"
        >
          <v-data-table
            :headers="headers"
            v-if="users"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
              <div
                v-if="loading"
                class="loading">
                Loading...
              </div>

              <div
                v-if="error"
                class="error">
                {{ error }}

              </div>
            </template>

            <template>
              {{ users }}
              <tr v-for="user in users" :key="user.id" >
                 <td> {{ user.first_name }} </td>
                 <td> {{ user.surname }} </td>
                 <td> {{ user.msisdn }} </td>
                 <td> {{ user.role_id}} </td>
                 <td> {{ user.gender}}</td>
             </tr> 

            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    
      loading: false,
      users: [],
      error: null,
      headers: [
      
      {
        sortable: false,
        text: 'First Name',
        value: 'first_name'
      },
      {
        sortable: false,
        text: 'Surname',
        value: 'surname'

      },
      {
        sortable: false,
        text: 'Phone Number',
        value: 'phone_number'
      },
      {
        sortable: false,
        text: 'Role',
        value: 'role'
      },
      {
        sortable: false,
        text: 'Gender',
        value: 'gender'
      }

    ],
    
  }),
  methods: {
    fetchUsers () {
     let url = '/api/users';
      let AuthStr = '';
    
      axios
      .get(this.url, { headers: {'Authorization' : 'Bearer ${AuthStr}'} })     
      .then((response) => {
          this.loading = false
          this.users = response.data
        })
        .catch(error => console.log(error)) 

    },
    created () {
      this.fetchUsers()
    }
  }
}
</script>
