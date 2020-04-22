<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap>

      <v-flex
        xs12
        text-xs-right>
        <v-btn
          class="mx-0 font-weight-light "
          color="success"
          @click="$router.push('new_covid19_resources')">

          Add A New COVID 19 Resource
        </v-btn>
      </v-flex>

      <v-snackbar
        color="error"
        v-model="snackbar"
        :timeout="12000"
        top>
        <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div> {{output.message}} {{ output.errors }} {{resp}}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
      </v-snackbar>

      <v-flex v-if="loading">
        <Loader />
      </v-flex>

      <v-row dense v-else>

      <v-col
        v-for="(result, index) in results"
        :key="result.id"
        cols="12"
        dark>

        <v-card 
        class="mx-auto"
        outlined>


            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
              :src="result.file || 'sunshine.jpg' "
              class="white--text align-end"
              
            />
             
              <v-list >
              <v-card-title class="headline"> {{ result.title }} </v-card-title>

              <v-card-actions>
                <v-card-text class="text--primary">
                <div><span> Created On: </span> {{ result.created_at }}</div>
              </v-card-text>

              <v-btn icon
                color="orange"
                @click="$router.push({ name: 'View COVID19 Resource', params: {id: result.id} })">
                <v-icon> mdi-plus  </v-icon>
              </v-btn>

              <v-btn icon
              color="green"
              @click="$router.push({ name : 'Edit COVID19 Resource', params: {id: result.id } })">
              <v-icon> mdi-pencil </v-icon>
            </v-btn>

            <v-btn icon
              color="red"
              @click=" deleteResource(result.id, index); loading=true ">
              <v-icon> mdi-delete </v-icon>
            </v-btn>

            </v-card-actions>              
          </v-list>

          </div>
          </v-card>

      
      
      </v-col>
    </v-row>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '../components/core/Loader'

export default {
  components: {Loader},

  data () {
    return {
      results: [],
      snackbar: false,
      output: '',
      resp: '',
      loading: true
    }
  },
  created () {
    this.getResources()
  },

  methods: {
    getResources () {

      axios.get('resources/special')
        .then((resources) => {
          console.log(resources.data)
          this.results = resources.data.data
          this.loading = false

        })
        .catch(() => {
          this.error = true
          this.resp = 'Check your internet connection or retry logging in.'
          this.snackbar = true
          this.loading = false
        })
    },

    deleteResource(id, index)  {

    axios.delete('resources/special/delete/' +id)
      .then((response) => {
      // this.result.splice(index, 1)
        console.log(response.data) 

        this.loading = false

        this.results.splice(index, 1)

        this.resp = 'Deleted Successfully'
          
        this.snackbar = true
      })
      .catch((error) => {
        this.error = true
        console.log(error)
        this.result = 'Failed, please try again'
        this.snackbar = true
      })

    }
  }
}
</script>

<style >
.v-card { margin: 20px; }

</style>
