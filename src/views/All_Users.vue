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

        <v-snackbar
          v-model="snackbar"
          :timeout="12000"
          color="error"
          top>
          <v-icon
            color="white"
            class="mr-3"
          >
            mdi-bell-plus
          </v-icon>
          <div> {{ output.errors }} {{ result }}</div>
          <v-icon
            size="16"
            @click="snackbar = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>

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
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            loading
            loading-text="Loading... Please wait"
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.county }}</td>
                <td>{{ props.item.sub_county }}</td>
                <td>{{ props.item.role.name }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.gender }}</td>

              </tr>
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
export default {
  data () {
    return {
      rowsPerPageItems: [100, 500, 1000],
      output: '',
      search: '',
      result: '',
      loading: false,
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
    getUsers () {
      this.loading = true
      axios.get('users')
        .then((users) => {
          console.log(users.data)
          this.all_users = users.data.data
          this.loopT(users.data.links.next)
        })
        .catch(() => {
          this.error = true
          this.result = 'Check your internet connection or retry logging in.'
          this.snackbar = true
        })
        .finally(() =>
          (this.loading = false))
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
