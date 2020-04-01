<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md10
      >
        <material-card
          color="green"
          title="New Broadcast"
          text="Kindly fill all the required fields"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              New Broadcast
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>
          <v-alert
            :value="alert"
            color="pink"
            dark
            border="top"
            transition="scale-transition"
          >
            {{output.message}} {{output.error}}
          </v-alert> 

          <v-form  ref="form" v-model="valid"  v-on:submit.prevent="postBroadcast">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                >
                <v-combobox
                  v-model="facility"
                  :items="all_facilities"
                  item-text="name"
                  item-value="id"
                  :search-input.sync="search"
                  hide-selected
                  chips
                  label="Select Facility"
                  :rules="[rules.required]"
                  required
                  :return-object="true"
                ></v-combobox>
              </v-flex>

                <v-flex
                  xs12
                >
                <v-combobox
                  v-model="cadres"
                  :items="all_cadres"
                  item-text="name"
                  item-value="id"
                  ref="cadres"
                  multiple
                  chips
                  label="Select Cadre"
                  :rules="[rules.required]"
                  required
                  
                ></v-combobox>
                <strong>{{ all_cadres.item }}</strong>&nbsp;
              </v-flex>

                <v-flex
                  xs12
                >
                <v-textarea
                  label="Message"
                  :rules="[rules.required]"
                  placeholder="Write here"
                  v-model="message"
                  required
                ></v-textarea>
              </v-flex>

                <v-btn 
                class="mr-4 success"
                :disabled="!valid"
                 @click="validate(); alert = !alert"
                type="submit">
                submit</v-btn>

             </v-layout>
            </v-container>
          </v-form>
          
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return{
      all_cadres : [],
      all_facilities : [],
      valid: true,
      alert: false,
      search: null,
      facility: '',
      output: '',
      cadres: [],
      message: '',
      rules: {
        required: value => !!value || 'This field is required.'
      },

    }
  },
  created () {
    this.getCadres()
    this.getFacilities()
  },

  methods : {
    validate () {
        this.$refs.form.validate()
      },

    getCadres () {
      axios.get('cadres')
        .then((cadres) => {
          console.log(cadres.data)
          this.all_cadres = cadres.data.data
        })
        .catch(error => console.log(error.message))
    },

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },


    postBroadcast(e) {
      e.preventDefault();
     
      axios.post('broadcasts/web/create', {
        facility_id : this.facility.id,
        
        cadres : this.cadres.map(item => item.id),
        message: this.message
      })
    .then((response) => {
      this.output = response.data
      this.$router.push('/all_broadcast')
        console.log(response);
    })
    .catch((error) => {
        console.log("error")
    })
    }
    }
 }
</script>
