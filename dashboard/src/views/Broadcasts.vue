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
<<<<<<< HEAD
            :items="broadcasts"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="broadcasts"
              slot-scope="{ broadcast }"
            >
              <td>{{ broadcast.facility_id }}</td>
              <td>{{ broadcast.created_by }}</td>
              <td>{{ broadcast.approved_by }}</td>
              <td> {{ broadcast.cadre }}</td>
              <td>{{ broadcast.message }}</td>

            </template>
=======
            hide-actions
          >
             <thead>
            <tr>
                <th>Cadre</th>
                <th>Facility</th>
                <th>Status</th>
                <th> Approved By </th>
                <th>Message</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="broadcast in broadcasts" :key="broadcast.id">
                    <td>{{ broadcast.cadre_id }}</td>
                    <td>{{ broadcast.facility_id }}</td>
                    <td>{{ broadcast.approved }}</td>
                    <td> {{broadcast.approved_by}}</td>
                    <td>{{broadcast.message}}</td>
                </tr>
            </tbody>
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
          </v-data-table>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
<<<<<<< HEAD
  data: () => ({
    broadcasts : [],
    headers: [
      
      {
        sortable: false,
        text: 'Facility',
        value: 'facility'
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
        text: 'Cadre',
        value: 'cadre'
      },
      {
        sortable: false,
        text: 'Message',
        value: 'message'
      }

    ],
  }),

  methods: {
    fetchBroadcasts () {
     let url = 'http://api/broadcasts';
      let AuthStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyOTJiZGM0MTE1MGZiYTQyMDcxMmQxNzQ1OWFhMGJhZmZmYzRmN2Y3YTUzZDAxM2M3NjAzYzJlMjQ3NWQ2YWJkOTU0NGZhYjdjZmMxNzAxIn0';
    
      axios
      .get(url, { headers: {'Authorization' : 'Bearer ${AuthStr}'} })     
      .then((response) => {
          this.loading = false
          this.broadcasts = response.data
        })
        .catch(error => console.log(error)) 

    },
    created () {
      this.fetchBroadcasts()
    }
  }
=======
  data () {
    return {
      broadcast: []
    }
  },
  mounted() {
    axios
    .get('https://broadcasts')
    .then(response => (this.info = response))
  }  
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
}
    
</script>
