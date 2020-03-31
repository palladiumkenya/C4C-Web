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
      Exposures
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
     </v-card-title>
          
          <v-data-table
            :headers="headers"
            :items="exposures"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }} {{ props.item.surname }} </td>
                <td>{{ props.item.previous_exposures }}</td>
                <td>{{ props.item.location }}</td>
                <td>{{ props.item.date }}</td>
                <td>{{ Boolean(props.item.pep_initiated) }}</td>
              </tr>
            </template>
            <template
              slot="expand"
              slot-scope="props">
              <v-card flat>
                <v-card-text>patient hiv status: {{ props.item.patient_hiv_status }} <br> patient hbv status: {{ props.item.patient_hbv_status }} <v-spacer/> description: {{ props.item.description }}</v-card-text>
              </v-card>
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
      rowsPerPageItems: [50, 250, 500],
      search: '',
      link: '',
      output: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Previous exposures',
          value: 'previous_exposures'
        },
        {
          sortable: false,
          text: 'Location',
          value: 'location'
        },
        {
          sortable: false,
          text: 'Date',
          value: 'Date'
        },
        {
          text: 'Pep Initiated',
          value: 'pep_initiated'
        }
      ],
      exposures: []
    }
  },
  created () {
    this.getExp()
  },
  methods: {
    getExp () {
      axios.get('exposures/all/')
        .then((exp) => {
          this.exposures = exp.data.data
          this.link = exp.data.links.next
          console.log(exp.data.data)
          this.loopT(this.link)
        })
        .catch(error => console.log(error.message))
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.exposures = this.exposures.concat(response.data.data)
        } else {
          i = 11
        }
      }
    }
  }
}
</script>
