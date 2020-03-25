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
         <v-text-field
            v-model="search"
            append-icon="mdi-search-web"
            label="Search"
            single-line
            hide-details
          /> <br>

          <v-data-table
            :headers="headers"
            :items="users"
            :rows-per-page-items="rowsPerPageItems"
            show-actions
            item-key="id">

            <template
                slot="items"
                slot-scope="props"> 
                
                <tr @click="props.expanded = !props.expanded">

                 <td> {{ props.item.first_name }} </td>
                 <td> {{ props.item.surname }} </td>
                 <td> {{ props.item.msisdn }} </td>
                 <td> {{ props.item.role_id}} </td>
                 <td> {{ props.item.gender}}</td>
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
  data() {
    return {
      rowsPerPageItems: [50, 250, 500],
      users: [],
      output: [],
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
        value: 'msisdn'
      },
      {
        sortable: false,
        text: 'Role',
        value: 'role_id'
      },
      {
        sortable: false,
        text: 'Gender',
        value: 'gender'
      }
    ],
  }
},

created () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
    axios.get('users')
      .then( function (response) {
        this.users = response.data.data
      })
      .catch(function (error) {
           currentObj.output = error})
      } 
    }
}
