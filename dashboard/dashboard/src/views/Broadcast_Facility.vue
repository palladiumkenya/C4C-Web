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
        xs12
        text-xs-right
      >

        <v-btn
          class="mx-0 font-weight-light "
          color="success"
          @click="$router.push('new_broadcast')"
        >
          Send A New Broadcast
        </v-btn>
      </v-flex>

      <v-flex
        md12
      >
        <v-card>
          <v-card-title>
          Broadcast History
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
            :items="all_messages"
            :search="search"
            show-actions
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.cadre.name }}</td>
                <td>{{ props.item.created_by }}</td>
                <td>{{ props.item.approved_by }}</td>
                <td>{{ props.item.facility.name }}</td>
                <td>{{ props.item.message }}</td>
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
      output: [],
      all_messages: [],
      headers: [
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre_id'
        },
        {
          sortable: false,
          text: 'Created By',
          value: 'created_by'
        },
        {
          sortable: false,
          text: 'Approved By',
          value: 'approved_by'
        },
        {
          sortable: false,
          text: 'Facility',
          value: 'facility_id'
        },
        {
          sortable: false,
          text: 'Message',
          value: 'message'
        }
      ]
    }
  },
  created () {
    this.getBroadcast()
  },
  methods: {
    getBroadcast () {
      axios.get('broadcasts/web/all')
        .then((broadcast) => {
          console.log(broadcast.data)
          this.all_messages = broadcast.data.data
        })
        .catch(error => console.log(error.message))
    }
  }
}
</script>
