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
          <v-data-table
            :headers="headers"
            :items="all_users"
            :rows-per-page-items="rowsPerPageItems"
            :dark="true"
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.surname }}</td>
                <td>{{ props.item.role.name }}</td>
                <td>{{ props.item.msisdn }}</td>
                <td>{{ props.item.gender }}</td>
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
      rowsPerPageItems: [50, 250, 500],
      output: [],
      all_users: [],
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
          sortable: true,
          text: 'Role',
          value: 'role_name'
        },
        {
          sortable: false,
          text: 'Phone Number',
          value: 'msisdn'
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
      axios.get('users')
        .then((users) => {
          console.log(users.data)
          this.all_users = users.data.data
          this.loopT(users.data.links.next)
        })
        .catch(error => console.log(error.message))
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
