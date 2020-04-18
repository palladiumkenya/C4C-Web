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
            :items="all_messages"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
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

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      output: [],
      all_messages: [],
      search: '',
      rowsPerPageItems: [50, 250, 500],
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

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
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
          this.loopT(broadcast.data.links.next)
        })
        .catch(error => console.log(error.message))

      if (this.user.role_id === 1) {
        axios.get('broadcasts/web/all')
          .then((broadcast) => {
            console.log(broadcast.data)
            this.all_messages = broadcast.data.data
            this.loopT(broadcast.data.links.next)
          })
          .catch(error => console.log(error.message))
      } else if (this.user.role_id === 4){
        axios.get(`broadcasts/web/history/${this.user.hcw.facility_id}`)
          .then((broadcast) => {
            // console.log(broadcast.data)
            this.all_messages = broadcast.data.data
            this.loopT(broadcast.data.links.next)
          })
          .catch(error => console.log(error.message))
      }

    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = broadcast.data.links.next
          this.all_messages = this.all_messages.concat(response.data.data)
        } else {
          i = 11
        }
      }
      console.log(this.all_messages)

    }
  }
}
</script>
