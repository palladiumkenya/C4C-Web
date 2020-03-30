<template>
<v-container grid-list-lg>
  <v-layout row wrap>

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


   <v-list-class xs12 sm6 md6 lg4 dense v-for="result in results" :key="result.id">

    <v-card
      min-width="900"
      max-width="900"
      style=padding-bottom  
      class="mx-auto flex"
    >
      <v-card-title class="headline">{{result.title}}</v-card-title>
      
       <v-card-actions> 
        <v-card-text class="text--primary">
        <div><span> Created On: </span> {{result.created_at}}</div>
        </v-card-text> 

        <v-card-text class="text--primary">
        <div><span> Facility: </span> {{result.facility_id}}</div>
        </v-card-text> 

        <v-btn
          color="orange"
          @click.stop="dialog = true">
          View More
        </v-btn>
       </v-card-actions>


      <v-dialog v-model="dialog"
       fullscreen hide-overlay transition="dialog-bottom-transition"
       scrollable
        max-width="90%">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title> {{result.title}}</v-toolbar-title>
        </v-toolbar>            

        <v-card-text height="500px">{{ result.body }}</v-card-text>
      </v-card>
      </v-dialog>

    </v-card>
   <v-spacer> </v-spacer>
   </v-list-class>
</v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

  export default {
    data () {
      return{
        results: [],
        dialog: false
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
      .catch(error => console.log(error.message));

      }
    }
  }
</script>