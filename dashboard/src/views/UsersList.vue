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
            show-actions
            item-key="id"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.surname }}</td>
                <td>{{ props.item.role_id }}</td>
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
      output: [],
      all_users: [],
      headers: [
        {
          sortable:false,
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
        },
      ],
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
        })
        .catch(error => console.log(error.message));
    }
  }
}
</script>
