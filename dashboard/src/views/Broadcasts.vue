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
          @click="$router.push('new-broadcast')"
        >
          Send A New Broadcast
        </v-btn>
      </v-flex>

      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Broadcast Messages"
        >
          <v-data-table
            :headers="headers"
            :items="all_messages"
            show-actions
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.created_by }}</td>
                <td>{{ props.item.approved_by }}</td>
                <td>{{ props.item.facility_id }}</td>
                <td>{{ props.item.message }}</td>
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
      all_messages: [],
      headers: [
        {
          sortable:false,
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
        },
      ],
    }
  },
  created () {
    this.getBroadcast()
  },
  methods: {
    getBroadcast () {
        axios.get('users')
        .then((broadcast) => {
          console.log(broadcast.data)
          this.all_messages = broadcast.data.data
        })
        .catch(error => console.log(error.message));
    }
  }
}
</script>
