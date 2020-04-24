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
            Health Care Workers
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
            :items="all_hcws"
            :rows-per-page-items="rowsPerPageItems"
            :search="search"
            loading
            loading-text="Loading... Please wait"
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.surname }}</td>
                <td>{{ props.item.facility_name }}</td>
                <!-- <td>{{ props.item.facility.county }}</td> -->
                <td>{{ props.item.department }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.dob }}</td>
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
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      all_hcws: [],
      search: '',
      snackbar: false,
      output: '',
      result: '',
      rowsPerPageItems: [100, 500, 1000],
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
          text: 'Facility',
          value: 'facility.name'
        },
        {
          sortable: false,
          text: 'Department',
          value: 'department'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Date Of Birth',
          value: 'dob'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    this.getHCW()
  },
  methods: {
    getHCW () {
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        axios.get('hcw')
          .then((workers) => {
            console.log(workers.data)
            this.all_hcws = workers.data.data
            this.loopT(workers.data.links.next)
          })
          .catch(() => {
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      } else if (this.user.role_id === 4) {
        axios.get(`hcw/facility/${this.user.hcw.facility_id}`)
          .then((workers) => {
            console.log(workers.data)
            this.all_hcws = workers.data.data
            this.loopT(workers.data.links.next)
          })
          .catch(() => {
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      }
    },
    async loopT (l) {
      var i, u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.all_hcws = this.all_hcws.concat(response.data.data)
        } else {
          i = 11
        }
      }
      if (this.user.role_id == 5) {
        for (var a in this.all_hcws){
          if (this.all_hcws[a].county == this.user.county) {
            u.push(this.all_hcws[a])
          }
        }
        this.all_hcws = u
      }
    }
  }
}
</script>
