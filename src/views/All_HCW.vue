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
            show-actions
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.surname }}</td>
                <td>{{ props.item.facility.name }}</td>
                <td>{{ props.item.facility.county }}</td>
                <td>{{ props.item.department }}</td>
                <td>{{ props.item.cadre.name }}</td>
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
      search: '',
      output: [],
      all_hcws: [],
      rowsPerPageItems: [50, 250, 500],
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
          text: 'County',
          value: 'facility.county'
        },
        {
          sortable: false,
          text: 'Department',
          value: 'department'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre.name'
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
      if (this.user.role_id === 1) {
        axios.get('hcw')
          .then((workers) => {
            console.log(workers.data)
            this.all_hcws = workers.data.data
            if (workers.data.links.next) {
              this.loopT(workers.data.links.next)
            }
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4) {
        axios.get(`hcw/facility/${this.user.hcw.facility_id}`)
          .then((workers) => {
            console.log(workers.data)
            this.all_hcws = workers.data.data
            if (workers.data.links.next) {
              this.loopT(workers.data.links.next)
            }
          })
          .catch(error => console.log(error.message))
      }
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.all_hcws = this.all_hcws.concat(response.data.data)
        } else {
          i = 11
        }
      }
    }
  }
}
</script>
