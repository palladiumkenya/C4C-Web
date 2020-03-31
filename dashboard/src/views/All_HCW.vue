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
          title="Health Care Workers"
        >
          <v-data-table
            :headers="headers"
            :items="all_hcws"
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
      output: [],
      all_hcws: [],
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
          value: 'facility_name'
        },
        {
          sortable: false,
          text: 'County',
          value: 'facility_county'
        },
        {
          sortable: false,
          text: 'Department',
          value: 'facility_department'
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
  created () {
    this.getHCW()
  },
  methods: {
    getHCW () {
      axios.get('hcw')
        .then((workers) => {
          console.log(workers.data)
          this.all_hcws = workers.data.data
        })
        .catch(error => console.log(error.message))
    }
  }
}
</script>
