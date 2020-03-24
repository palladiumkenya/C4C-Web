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
        xs8
        text-xs-center>

        <v-btn
          class="mx-0 font-weight-light"
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
          </v-data-table>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
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
}
    
</script>
