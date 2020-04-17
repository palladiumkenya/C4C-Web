<template>
  <v-container >

      <v-flex
        xs12
        text-xs-right>
        <v-btn
          class="mx-0 font-weight-light "
          color="success"
          @click="$router.push('add_protocal')"
        >
          Add A New Protocal
        </v-btn>
      </v-flex>

    <v-row dense>  
      <v-col
        v-for="result in results"
        :key="result.id"
        cols="12"
        dark>

          <v-card
            class="mx-auto">
       
            <v-card-title class="headline">{{ result.title }}</v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-card-text class="text--primary">
                <div><span> Created On: </span> {{ result.created_at }}</div>
              </v-card-text>

              <v-btn
                color="orange"
                @click="$router.push({ name: 'View Protocal', params: {id: result.id} })">
                View More
              </v-btn>
            </v-card-actions>

          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      results: []
    }
  },
  created () {
    this.getProtocals()
  },
  methods: {
    getProtocals () {
      axios.get('resources/hcw/protocols')
        .then((protocals) => {
          console.log(protocals.data)
          this.results = protocals.data.data
        })
        .catch(error => console.log(error.message))
    }
  }
}
</script>

<style >
.v-card { margin: 20px; }

</style>
