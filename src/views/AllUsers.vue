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

        <v-card>
          <v-card-title>
            All Users
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="all_users"
            :loading="true"
            class="elevation-1"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            item-key="id"
          >

          <template slot='no-data'>
              <v-progress-linear slot='progress' indeterminate></v-progress-linear>
          </template>
                
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.county }}</td>
            <td>{{ props.item.sub_county }}</td>
            <td>{{ props.item.role.name }}</td>
            <td>{{ props.item.cadre }}</td>
            <td>{{ props.item.gender }}</td>

          </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="success"
              icon="mdi-emoticon-sad">
              Your search for "{{ search }}" found no results.
            </v-alert>

          </v-data-table>

        </v-card>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {

  data () {
    return {
      rowsPerPageItems: [100, 2000, 10000],
      search: '',
      isLoading: true,
      all_users: [],
      headers: [
        {
          sortable: true,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'County',
          value: 'county'
        },
          {
            sortable: false,
            text: 'Sub County',
            value: 'sub_county'
          },
        {
          sortable: true,
          text: 'Role',
          value: 'role_name'
        },
      
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Gender',
          value: 'gender'
        }
      ]
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    ...mapMutations(["showSnackbar", "closeSnackbar"]),

    getUsers () {
      axios.get('users')
        .then((users) => {
          console.log(users.data)
          this.all_users = users.data.data
          this.loopT(users.data.links.next)
          this.isLoading = false
        })
        .catch(() => {
          this.error = true
          this.showSnackbar({ text: "Check your internet connection or retry logging in." }) 
        })
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.all_users = this.all_users.concat(response.data.data)
        } else {
          i = 11
        }
      }
    }
  }
}
</script>
