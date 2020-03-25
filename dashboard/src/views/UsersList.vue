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
          flat
          full-width
          title="All Users"
        >
          <v-data-table
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

              {{ data }}

              <tr
                v-for="user in users"
                :key="user.id" >
                <td> {{ user.first_name }} </td>
                <td> {{ user.surname }} </td>
                <td> {{ user.gender }} </td>
                <td> {{ user.msisdn }} </td>
                <td> {{ user.role_id }} </td>
                <td>
                  <div
                    class="btn-group"
                    role="group">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"> View More </button>
                  </div>
                </td>
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

var app = new Vue({
  el: '#app',
  data: {
    data: []
  },
  mounted () {
    axios
      .request({
        method: 'get',
        baseURL: 'http://api/users',
        headers: {
          'Authorization': 'Bearer '
        }
      })
      .then(response => {
        console.log(response.data)
      })
  }

})

</script>
