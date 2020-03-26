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
          title="Broadcast Messages"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-search-web"
            label="Search"
            single-line
            hide-details
          /><br>
          <v-data-table
            :headers="headers"
            :items="exposures"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            show-actions
            item-key="id"
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
          </v-data-table>
        </material-card>
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
          console.log(this.exposures)
          let link = exp.data.links.next
          while(link != null){
            console.log("in")
            axios.get(link)
            .then((nex) => {
              this.exposures = this.exposures.concat(nex.data.data)
              link = nex.data.link.next
            })
          }
          
        })
        .catch(error => console.log(error.message));
    }
  }
}
</script>
