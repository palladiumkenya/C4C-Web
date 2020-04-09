<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap
      >          
          <v-card
          fullscreen
          hide-overlay
          scrollable
          min-width="90%"  
          >  
 
            <v-card-title class="headline"> {{ result.title }} </v-card-title>
            <v-list v-for="file in result.files" >
              <v-card-text height="500px"> Download Documents :<a :href=" file.link " target="_blank" > {{ file.file_name }} </a> </v-card-text>
              </v-list>
              <v-card-text height="500px">{{ result.body }}</v-card-text> 
              
            </v-card>
        </v-layout>
    </v-container>    
</template>  

<script>
import axios from 'axios'

export default {

  data () {
    return {
      result:[],
      results: []
    }
  },
  created () {
    this.getResource()

  },

  methods: {
    getResource () {
      var id = this.$route.params.id;
      axios.get('resources/cmes/' +id)
        .then((resource) => {
          console.log(resource.data)
          this.result = resource.data.data
        })
        .catch(error => console.log(error.message))
    }
    
  }
}
</script>
